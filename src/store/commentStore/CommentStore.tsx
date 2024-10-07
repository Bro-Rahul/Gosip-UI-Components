import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { AuthContextSchema, authContext } from "../authStore/AuthStore";
import { CommentSchema, SecretKeyIdentityCommenterIdSchema, MetaDataSchema, AddCommentSchema, ReplyCommentSchema, UpdateCommentSechema, DeleteCommentSchema, VoteSchema } from "../../schema";
import useComments from "../../hook/useComment";
import { PostCommentsOnThePost, PostReplyCommentOnPost, updateUserComment, deleteUserComment, handleVoteOnComments } from "../../../http";
import { filterSubComments, mainComments } from "../../../utils";

interface CommentContextSchema {
    identity: string,
    comments: CommentSchema[],
    mainComments: number[],
    loading: boolean,
    error: boolean,
    metaData: MetaDataSchema,
    post_id: number,
    addComment: (body: AddCommentSchema) => void,
    addReplyComment: (body: ReplyCommentSchema) => void,
    updateComment: (body: UpdateCommentSechema) => void,
    deleteComment: (body: DeleteCommentSchema) => void,
    handleVote: (body: VoteSchema) => void
}


export const commentContext = createContext<CommentContextSchema>({
    identity: '',
    comments: [],
    mainComments: [],
    error: false,
    loading: false,
    metaData: {
        body: '',
        image: null,
        title: ''
    },
    post_id: -1,
    addComment: (body: AddCommentSchema) => { },
    addReplyComment: (body: ReplyCommentSchema) => { },
    updateComment: (body: UpdateCommentSechema) => { },
    deleteComment: (body: DeleteCommentSchema) => { },
    handleVote: (body: VoteSchema) => { }
});

const BaseProvider: React.FC<{ post_id: string, postMetaData: MetaDataSchema, children: ReactNode }> = (props) => {
    const { key, autheticated, commenter } = useContext<AuthContextSchema>(authContext);

    const userDetaile: SecretKeyIdentityCommenterIdSchema = {
        key: key,
        identity: props.post_id,
        post: props.postMetaData,
        user_id: autheticated ? commenter.id : null
    }
    const { data, error, loading } = useComments(userDetaile);
    const [commentsList, setCommentsList] = useState<CommentContextSchema>({
        identity: props.post_id,
        comments: [],
        mainComments: [],
        metaData: props.postMetaData,
        error: false,
        loading: true,
        post_id: -1,
        addComment: async (body: AddCommentSchema) => {
            try {
                const response = await PostCommentsOnThePost(body);

                setCommentsList(pre => {
                    return {
                        ...pre,
                        comments: [...pre.comments, response],
                        mainComments: [...pre.mainComments, response.id],
                        loading: false,
                    }
                })
            } catch (err) {
                setCommentsList(pre => ({
                    ...pre,
                    comments: [
                        ...pre.comments,
                    ],
                    mainComments: [...pre.mainComments],
                    error: true,
                    loading: false
                }));
            }
        },
        addReplyComment: async (body: ReplyCommentSchema) => {
            try {
                const response = await PostReplyCommentOnPost(body);
                setCommentsList(prev => {
                    const updatedComments = prev.comments.map(comment => {
                        if (comment.id === body.reply) {
                            return {
                                ...comment,
                                sub_comments: [...comment.sub_comments, response.id],
                            };
                        }
                        return comment;
                    });

                    return {
                        ...prev,
                        comments: [...updatedComments, response],
                        mainComments: [...prev.mainComments],
                        loading: false,
                    };
                });
            } catch (err) {
                console.error('Error adding reply comment:', err);
                setCommentsList(prev => ({
                    ...prev,
                    error: true,
                    loading: false,
                }));
            }
        },
        updateComment: async (body: UpdateCommentSechema) => {
            try {
                const response = await updateUserComment(body);
                setCommentsList(pre => ({
                    ...pre,
                    comments: pre.comments.map(item => {
                        if (item.id === body.id) {
                            return {
                                ...response
                            }
                        } else {
                            return item;
                        }
                    }),
                    error: false,
                    loading: false
                }));
            } catch (err) {
                console.log('somthing went wrong');
                setCommentsList(pre => ({
                    ...pre,
                    error: true,
                    loading: false,
                }))
            }
        },
        deleteComment: async (body: DeleteCommentSchema) => {
            try {
                const mainCommentId: number = await deleteUserComment(body);

                setCommentsList(prev => {
                    const mainComment: CommentSchema = prev.comments.find(comment => comment.id === mainCommentId)!;
                    const deleteCommentsList: number[] = filterSubComments(prev.comments, mainComment);
                    deleteCommentsList.push(mainCommentId);

                    return {
                        ...prev,
                        comments: prev.comments.filter(comment => !deleteCommentsList.includes(comment.id)),
                        mainComments: prev.mainComments.filter(id => !deleteCommentsList.includes(id)),
                        loading: false,
                    };
                });
            } catch (err) {
                console.error('Error deleting comment:', err);
                setCommentsList(prev => ({
                    ...prev,
                    error: true,
                    loading: false,
                }));
                alert('Cannot delete the comment');
            }
        },
        handleVote: async (body: VoteSchema) => {
            try {
                const response = await handleVoteOnComments(body);
                setCommentsList(pre => {
                    const updatedComments = pre.comments.map(comment => {
                        if (comment.id === body.comment) {
                            const updatedComment = { ...comment };

                            if (!updatedComment.vote) {
                                updatedComment.vote = response.vote;
                                response.vote === 'LIKE' ? updatedComment.like++ : updatedComment.dislike++;
                            } else if (updatedComment.vote.toLowerCase() !== body.vote!.toLowerCase()) {
                                if (response.vote === 'LIKE') {
                                    updatedComment.like++;
                                    updatedComment.dislike--;
                                } else {
                                    updatedComment.like--;
                                    updatedComment.dislike++;
                                }
                                updatedComment.vote = response.vote;
                            } else {
                                // User clicked the same button twice
                                if (updatedComment.vote.toLowerCase() === body.vote!.toLowerCase()) {
                                    if (updatedComment.vote === 'LIKE') {
                                        updatedComment.like--;
                                    } else {
                                        updatedComment.dislike--;
                                    }
                                    updatedComment.vote = null; // Reset the vote to null if it matches the existing vote
                                }
                            }

                            return updatedComment;
                        }
                        return comment;
                    });

                    return {
                        ...pre,
                        comments: updatedComments,
                        loading: false
                    };
                });
            } catch (err) {
                setCommentsList(pre => ({
                    ...pre,
                    error: true,
                    loading: false
                }));
            }
        }

    });

    useEffect(() => {
        if (!loading && !error && data) {
            const mainCommentsList = mainComments(data.user_post.comments);

            setCommentsList((prev) => ({
                ...prev,
                comments: data.user_post.comments,
                mainComments: [...mainCommentsList],
                metaData: props.postMetaData,
                post_id: data.user_post.id
            }));
        } else if (!loading && error) {
            setCommentsList((prev) => ({
                ...prev,
                comments: [],
                error: true,
            }));
        }
    }, [loading]);

    return (
        <commentContext.Provider value={commentsList}>
            {props.children}
        </commentContext.Provider>
    )
}

export default BaseProvider
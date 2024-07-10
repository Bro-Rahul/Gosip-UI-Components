import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { AuthContextSchema, authContext } from "../authStore/AuthStore";
import { CommentSchema, SecretKeyIdentitySchema, MetaDataSchema, AddCommentSchema,ReplyCommentSchema,UpdateCommentSechema, DeleteCommentSchema } from "../../schema";
import useComments from "../../hook/useComment";
import { PostCommentsOnThePost ,PostReplyCommentOnPost,updateUserComment,deleteUserComment} from "../../../http";
import { filterSubComments,SortMainComments } from "../../../utils";

interface CommentContextSchema {
    identity: string,    // this is unique id which is give by the user side
    comments: CommentSchema[],
    mainComments : CommentSchema[],
    loading: boolean,
    error: boolean,
    metaData: MetaDataSchema,
    post_id : number,
    addComment: (body: AddCommentSchema) => void,
    addReplyComment : (body: ReplyCommentSchema) => void,
    updateComment : (body: UpdateCommentSechema) => void,
    deleteComment : (body: DeleteCommentSchema) => void
}


export const commentContext = createContext<CommentContextSchema>({
    identity: '',
    comments: [],
    mainComments : [],
    error: false,
    loading: false,
    metaData: {
        body: '',
        image: null,
        title: ''
    },
    post_id : -1,
    addComment: (body: AddCommentSchema) => { },
    addReplyComment : (body:ReplyCommentSchema) => { },
    updateComment : (body:UpdateCommentSechema) => { },
    deleteComment : (body:DeleteCommentSchema) => { },

});

const BaseProvider: React.FC<{ post_id: string, postMetaData: MetaDataSchema, children: ReactNode }> = (props) => {
    const { key } = useContext<AuthContextSchema>(authContext);

    const userDetaile: SecretKeyIdentitySchema = {
        key: key,
        identity: props.post_id,   // this is the unique identifier for each post 
        post: props.postMetaData
    }
    const { data, error, loading } = useComments(userDetaile);
    const [commentsList, setCommentsList] = useState<CommentContextSchema>({
        identity: props.post_id,
        comments: [],
        mainComments : [],
        metaData: props.postMetaData,
        error: false,
        loading: true,
        post_id : -1,
        addComment: async (body: AddCommentSchema) => {
            try {
                const response = await PostCommentsOnThePost(body);

                setCommentsList(pre=>{
                    const updatedComment = pre.mainComments
                    updatedComment.push(response);
                    const sortedComment = updatedComment.sort((a,b)=>{
                        const dateA = new Date(a.created_at);
                        const dateB = new Date(b.created_at);
                        return dateB.getTime() - dateA.getTime();
                    });
                    return{
                        ...pre,
                        comments : [...pre.comments,response],
                        mainComments : [...sortedComment],
                        loading : false,
                    }
                })
            } catch (err) {
                setCommentsList(pre => ({
                    ...pre,
                    comments: [
                        ...pre.comments,
                    ],
                    mainComments : [...pre.mainComments],
                    error: true,
                    loading : false
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
                                sub_comments: [...comment.sub_comments, response.id]
                            };
                        }
                        return comment;
                    });
        
                    return {
                        ...prev,
                        comments: [...updatedComments, response],
                        mainComments : [...prev.mainComments],
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
        updateComment : async (body:UpdateCommentSechema)=>{
            try{
                const response = await updateUserComment(body);
                setCommentsList(pre=>({
                    ...pre,
                    comments : pre.comments.map(item=>{
                        if(item.id === body.id){
                            return {
                                ...response
                            }
                        }else{
                            return item;
                        }
                    }),
                    error : false,
                    loading : false
                }));
            }catch(err){
                console.log('somthing went wrong');
                setCommentsList(pre=>({
                    ...pre,
                    error : true,
                    loading : false,
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
                        mainComments : prev.mainComments.filter(comment => !deleteCommentsList.includes(comment.id)),
                        loading: false,
                    };
                });
            } catch (err) {
                // Added console.error for better error logging
                console.error('Error deleting comment:', err);
                setCommentsList(prev => ({
                    ...prev,
                    error: true,
                    loading: false,
                }));
                alert('Cannot delete the comment');
            }
        }
    });

    useEffect(() => {
        if (!loading && !error && data) {
            const mainComments = SortMainComments(data.user_post.comments);
            const sortedComment = mainComments.sort((a, b) => {
                const dateA = new Date(a.created_at);
                const dateB = new Date(b.created_at);
                return dateB.getTime() - dateA.getTime();
            });
            setCommentsList((prev) => ({
                ...prev,
                comments: data.user_post.comments,
                mainComments : mainComments,
                metaData: props.postMetaData,
                post_id : data.user_post.id
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
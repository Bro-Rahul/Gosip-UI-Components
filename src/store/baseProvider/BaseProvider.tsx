import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { authContext, ContextSechema } from "../storeProvider/CommentProvider";
import { CommentSchema, SecretKeyAndIdentitySchema, AddCommentTypeSchema, ReplyCommentSchema } from "../../model";
import { PostCommentsOnThePost, PostReplyCommentOnPost } from "../../../http";
import { Comments } from "../../components";
import useComments from "../../hook/useComment";

interface CommentContext {
    id: string,
    comments: CommentSchema[],
    loading: boolean,
    error: boolean,
    addComment: (body: AddCommentTypeSchema) => void,
    addReplyComment: (body: ReplyCommentSchema) => void
}


export const commentContext = createContext<CommentContext>({
    id: '',
    comments: [],
    error: false,
    loading: false,
    addComment: (body: AddCommentTypeSchema) => { },
    addReplyComment: (body: ReplyCommentSchema) => { }
});

const BaseProvider: React.FC<{ post_id: string, children: ReactNode }> = (props) => {
    const { key } = useContext<ContextSechema>(authContext);
    const userDetaile: SecretKeyAndIdentitySchema = {
        key: key,
        identity: props.post_id
    }
    const { data, error, loading } = useComments(userDetaile);

    const [commentsList, setCommentsList] = useState<CommentContext>({
        id: props.post_id,
        comments: [],
        error: false,
        loading: true,
        addReplyComment: async (body: ReplyCommentSchema) => {
            try {
                const response = await PostReplyCommentOnPost(body);
                setCommentsList((prev) => ({
                    ...prev,
                    comments: response.user_post.comments,
                    loading: false,
                }));
            } catch (err) {
                console.log(err);
                setCommentsList(pre => ({
                    ...pre,
                    error: true,
                    loading: false
                }));
            }
        },
        addComment: (body: AddCommentTypeSchema) => {
            const makePostComment = async (body: AddCommentTypeSchema) => {
                try {
                    const response = await PostCommentsOnThePost(body);
                    setCommentsList(pre => ({
                        ...pre,
                        comments: [
                            ...pre.comments,
                            response
                        ],
                        error: false,
                        loading: false,
                    }));
                } catch (err) {
                    setCommentsList(pre => ({
                        ...pre,
                        comments: [
                            ...pre.comments,
                        ],
                        error: true,
                        loading: false,
                    }));
                }
            };
            makePostComment(body);
        },
    });

    useEffect(() => {
        if (!loading && !error && data) {
            setCommentsList((prev) => ({
                ...prev,
                comments: data.user_post.comments,
                loading: false,
            }));
        } else if (!loading && error) {
            setCommentsList((prev) => ({
                ...prev,
                comments: [],
                error: true,
                loading: false,
            }));
        }
    }, [loading]);

    return (
        <commentContext.Provider value={commentsList}>
            <Comments />
        </commentContext.Provider>
    )
}

export default BaseProvider
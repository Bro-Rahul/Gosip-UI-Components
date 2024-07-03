import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { authContext, ContextSechema } from "../storeProvider/CommentProvider";
import { CommentSchema, SecretKeyAndIdentitySchema, AddCommentTypeSchema } from "../../model";
import { PostCommentsOnThePost } from "../../../http";
import { Comments } from "../../components";
import useComments from "../../hook/useComment";

interface CommentContext {
    id: string,
    comments: CommentSchema[],
    loading: boolean,
    error: boolean,
    setComments: (post_id: string) => void,
    addComment: (body: AddCommentTypeSchema) => void,
}


export const commentContext = createContext<CommentContext>({
    id: '',
    comments: [],
    error: false,
    loading: false,
    setComments: (post_id: string) => { },
    addComment: (body: AddCommentTypeSchema) => {  },
});

const BaseProvider: React.FC<{ post_id: string, childres: ReactNode }> = (props) => {
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
        setComments: () => { },
        addComment: (body:AddCommentTypeSchema) => {
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

    /* const addComment = async (body: AddCommentTypeSchema) => {
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
    }; */


    return (
        <commentContext.Provider value={commentsList}>
            <Comments />
        </commentContext.Provider>
    )
}

export default BaseProvider
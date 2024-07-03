import { useState, useEffect } from "react";
import { SecretKeyAndIdentitySchema } from "../model";
import { PostCommentSchema } from "../model";
import { fetchPostComments } from "../../http";

const useComments = (userDetaile: SecretKeyAndIdentitySchema): { data: PostCommentSchema | undefined, loading: boolean, error: boolean } => {
    const [data, setData] = useState<PostCommentSchema>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const getComments = async () => {
            try {
                const responseData = await fetchPostComments(userDetaile);
                setData(responseData);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getComments();
    }, []);
    return { data, loading, error };
};

export default useComments;

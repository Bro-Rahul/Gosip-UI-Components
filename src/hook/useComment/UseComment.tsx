import React, { useEffect, useState } from 'react'
import { PostCommentSchema, SecretKeyIdentitySchema } from '../../schema';
import { fetchPostComments } from '../../../http';

const useComments = (userDetaile: SecretKeyIdentitySchema): { data: PostCommentSchema | undefined, loading: boolean, error: boolean } => {
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
import React, { useEffect, useState } from 'react';
import UserComments from '../../form/UserComments/UserComments.js';
import { PostComments } from '../../model/index.js';
import { fetchPostComments } from '../../../http.js';
import CommentForm from '../../form/CommentForm';
import { useContext } from 'react';
import { authContext,AuthenticateUser } from '../../store/storeProvider/CommentProvider.js';
import "../../../global.css"

const Comments:React.FC<{slug:string}>= (props) => {
  const data = useContext<AuthenticateUser>(authContext)

  const [response, setResponse] = useState<PostComments>();
  const [dataloaded, setDataLoaded] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const getComments = async () => {
      try {
        const comments = await fetchPostComments(props.slug);
        setResponse(comments);
        setDataLoaded(true);
        console.log(comments);
      } catch (error) {
        setError(true);
        setDataLoaded(true);
        console.error("Error fetching comments:", error);
      }
    };
    getComments();
  }, []);

  let content;
  if (dataloaded && error) {
    content = "an error occur "
    console.log(response)
  } else if (dataloaded && !error) {
    content = response!.post.comments.map(comment => <UserComments key={comment.id} userComment={comment} />)
  } else {
    content = "Loading..."
  }
  return (
    <div className='comments-container'>
      <p>{data.username} {data.email}</p>
      <CommentForm />
      <div className="comments-lists">
        {content}
      </div>
    </div>
  );
}

export default Comments;

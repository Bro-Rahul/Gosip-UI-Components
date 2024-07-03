import React, { useEffect, useState } from 'react';
import UserComments from '../../form/UserComments/UserComments.js';
import { PostComments } from '../../model/index.js';
import { fetchPostComments } from '../../../http.js';
import CommentForm from '../../form/CommentForm';
import { useContext } from 'react';
import { authContext } from '../../store/storeProvider/CommentProvider.js';
import "../../../global.css"

const Comments: React.FC<{id:string}> = (props) => {
  const data = useContext<string>(authContext)


  const [response, setResponse] = useState<PostComments>();
  const [dataloaded, setDataLoaded] = useState(false)
  const [error, setError] = useState(false)
  useEffect(()=>{
    const getComments = async() =>{
        try{
          const userDetaile = {
            key : data,
            identity : props.id
          } 
          console.log(userDetaile)
          const responseData = await fetchPostComments(userDetaile);
          setResponse(responseData);
          console.log(data)
        }catch(err){
          setError(true);
        }finally{
          setDataLoaded(true);
        }
    }
    getComments()
  },[])

  let content;
  if (dataloaded && error) {
    content = "an error occur "
    console.log(response)
  } else if (dataloaded && !error) {
    console.log(response)
    content = response!.user_post.comments!.map(item=><UserComments key={item.id} userComment={item}/>)
  } else {
    content = "Loading..."
  }
  return (
    <div className='comments-container'>
      <CommentForm />
      <div className="comments-lists">
        {content}
      </div>
    </div>
  );
}

export default Comments;

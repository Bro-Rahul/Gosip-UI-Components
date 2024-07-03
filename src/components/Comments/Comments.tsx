import React from 'react';
import UserComments from '../../form/UserComments/UserComments';
import CommentForm from '../../form/CommentForm';
import { useContext } from 'react';
import { commentContext } from '../../store/baseProvider/BaseProvider';
import "../../../global.css"

const Comments: React.FC= (props) => {

  const {comments} = useContext(commentContext);

  const content = comments.map(item => <UserComments key={item.id} userComment={item}/>)

  /* const [response, setResponse] = useState<PostCommentSchema>();
  const [dataloaded, setDataLoaded] = useState(false)
  const [error, setError] = useState(false)
  useEffect(()=>{
    const getComments = async() =>{
        try{
          const userDetaile = {
            key : key,
            identity : props.id
          } 
          console.log(userDetaile)
          const responseData = await fetchPostComments(userDetaile);
          setResponse(responseData);
          console.log(key)
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
  } */
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

import React from 'react';
import UserComments from '../../form/UserComments/UserComments';
import CommentForm from '../../form/CommentForm';
import { useContext } from 'react';
import { commentContext } from '../../store/baseProvider/BaseProvider';
// import "../../../global.css"
//import "../../../test.css"
import "../../../test2.css"
const Comments: React.FC= (props) => {

  const {comments} = useContext(commentContext);

  const content = comments.map(item => <UserComments key={item.id} userComment={item}/>)

  return (
    <div className='comments-container'>
      <CommentForm isReplyComment={0} disableAddComment={()=>false}/>
      <div className="comments-lists">
        {content}
      </div>
    </div>
  );
}

export default Comments;

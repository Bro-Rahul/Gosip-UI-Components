import React, { useState } from 'react'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Comments } from '../../model';
import CommentForm from '../CommentForm';


const UserComments:React.FC<{userComment:Comments}> = (props) => {
    const { sub_comments: subComments } = props.userComment;
    const hasSubComments = subComments.length > 0;
    const [showSubComments, SetShowSubComments] = useState(false)    
    const [addComment, setAddComment] = useState(false)    
    const DefaultImage:React.FC<{username:string}> = (props)=>  (
        <div className='default-avatar'>
            {props.username[0]}
        </div>
    )
    return (
        <section className='usercomments-container'>
            <div className='users-avatar'>
                {props.userComment.avatar===''?<DefaultImage username={props.userComment.user}/>: <img src={`http://127.0.0.1:8000/media/${props.userComment.avatar}`} alt='user avatar' />}
            </div>
            <div className='user-comment-body-container'>
                <div className='user-comment-username'>
                    <div>
                        <span>{props.userComment.user}</span>
                        <p><CiMenuKebab className='user-comment-control' /></p>
                    </div>
                    <p>{props.userComment.period} ago.</p>
                </div>
                <div className='user-comment-body'>
                    <span>{props.userComment.body}</span>
                    <div>
                        <p><AiOutlineLike /> {!props.userComment.like  ? 0 : props.userComment.like}</p>
                        <p><AiOutlineDislike /> {!props.userComment.dislike ? 0 : props.userComment.dislike}</p>
                        <p onClick={() => SetShowSubComments(pre => !pre)}>Reply <BsReply />{hasSubComments && subComments.length}</p>
                        <p onClick={()=>setAddComment(pre=>!pre)}>Add Reply<IoIosAddCircleOutline /></p>
                    </div>
                </div>
                {addComment && <CommentForm/>}
                {showSubComments && <div>
                    {subComments.map(comment => <UserComments key={comment.id} userComment={comment} />)}
                </div>}
            </div>
        </section>
    );
}

export default UserComments;

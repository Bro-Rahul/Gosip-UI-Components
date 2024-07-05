import React, { useState } from 'react'
import { AiOutlineLike,AiOutlineDislike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { MdOutlineEditCalendar } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CommentSchema } from '../../model';
import CommentForm from '../CommentForm';
import ControlMenu from './ControlMenu';
import { useContext } from 'react';
import { authContext } from '../../store/storeProvider/CommentProvider';
import UpdateCommentForm from '../UpdateCommentForm';


const UserComments:React.FC<{userComment:CommentSchema}> = (props) => {
    const { sub_comments: subComments } = props.userComment;
    const hasSubComments = subComments.length > 0;
    const [showSubComments, SetShowSubComments] = useState<boolean>(false)
    const [addComment, setAddComment] = useState<boolean>(false)
    const [toggleMenu,setToggleMenu] = useState<boolean>(false)
    const [update,setUpdate] = useState<boolean>(false)


    const {commenter} = useContext(authContext);
    const canEdit = commenter.username === props.userComment.user

    const DefaultImage:React.FC<{username:string}> = (props)=>  (
        <div>
            {props.username[0]}
        </div>
    )
    return (
        <section className='usercomments-container'>
            <div className='users-avatar'>
                {!props.userComment.profile?<DefaultImage username={props.userComment.user}/>: <img src={`http://127.0.0.1:8000/${props.userComment.profile}`} alt='user avatar' />}
            </div>
            <div className='user-comment-body-container'>
                <div className='user-comment-username'>
                    <div>
                        <span>{props.userComment.user}</span>
                        <div
                            className='user-comment-control'
                        >
                            <CiMenuKebab onClick={()=>setToggleMenu(pre=>!pre)}/>
                            {toggleMenu && <ControlMenu comment={props.userComment} key={props.userComment.id} />}
                        </div>
                    </div>
                    <p>{props.userComment.time_period} ago.</p>
                </div>
                <div className='user-comment-body'>
                    <span>{props.userComment.body}</span>
                    <div>
                        <p><AiOutlineLike /> {!props.userComment.like  ? 0 : props.userComment.like}</p>
                        <p><AiOutlineDislike /> {!props.userComment.dislike ? 0 : props.userComment.dislike}</p>
                        <p onClick={() => SetShowSubComments(pre => !pre)}><BsReply />{hasSubComments && subComments.length} Reply</p>
                        <p onClick={()=>setAddComment(pre=>!pre)}><IoIosAddCircleOutline /> Add Reply</p>
                        {canEdit && <p onClick={()=>setUpdate(pre=>!pre)}><MdOutlineEditCalendar /> Edit.</p>}
                    </div>
                </div>
                {update && <UpdateCommentForm cancelUpdate={setUpdate} commentId={props.userComment.id}/>}
                {addComment && <CommentForm isReplyComment={props.userComment.id} disableAddComment={setAddComment} />}
                {showSubComments && <div>
                    {subComments.map(comment => <UserComments key={comment.id} userComment={comment} />)}
                </div>}
            </div>
        </section>
    );
}

export default UserComments;

import React, { useState, useContext } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineDislike, AiOutlineLike, AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineEditCalendar } from "react-icons/md";
import AuthenticateUser from '../AuthenticateUser';
import UserControl from '../UserControl';
import UpdateComment from '../UpdateComment';
import UserAvatar from '../UserAvatar';
import { commentContext } from '../../store/commentStore/CommentStore';
import { CommentSchema } from '../../schema';
import { authContext } from '../../store/authStore/AuthStore';
import { filterSubCommentsAtSingleLevel } from '../../../utils';

interface ToggleEvents {
  reply: boolean,
  addReply: boolean,
  edit: boolean,
  menu: boolean
}
interface VoteEvent {
  like: boolean,
  disLike: boolean,
}
interface UserCommentProps {
  comment: CommentSchema
}

const UserComment: React.FC<UserCommentProps> = ({ comment }) => {

  const { comments, handleVote } = useContext(commentContext);
  const { commenter, autheticated } = useContext(authContext);


  const hasPermission = comment.created_by === commenter.id

  const defaultEvent: ToggleEvents = {
    addReply: false,
    edit: false,
    menu: false,
    reply: false
  }
  const getDefaultVote = (): VoteEvent => {
    if (!autheticated) {
      return {
        disLike: false,
        like: false,
      }
    }else {
      return {
        like: comment.vote?.toLowerCase() === 'like',
        disLike: comment.vote?.toLowerCase() === 'dislike'
      };
    }
  };

  const handleOnClickVote = (givenVote: 'like' | 'disLike') => {
    setVotes(prevVotes => {
      if (!comment.vote) {
        return {
          ...prevVotes,
          like: givenVote === 'like',
          disLike: givenVote === 'disLike'
        };
      }
      if (givenVote !== comment.vote?.toLowerCase()) {
        return {
          ...prevVotes,
          like: givenVote === 'like',
          disLike: givenVote === 'disLike'
        };
      } else {
        return {
          ...prevVotes,
          like: false,
          disLike: false
        };
      }
    });
    handleVote({ comment: comment.id, user: commenter.id, vote: givenVote });
  };

  const [togglesEvent, setTogglesEvent] = useState<ToggleEvents>(defaultEvent);
  const [votes, setVotes] = useState<VoteEvent>(getDefaultVote());

  const subComments = filterSubCommentsAtSingleLevel(comments, comment);
  //{togglesEvent.reply ? ` ${'slideIn'}`:`comment-subcomment`}
  return (
    <section className='user-comment-container'>
      <UserAvatar profile={comment.profile} user={comment.user} key={comment.profile} />
      <div className={!togglesEvent.edit ? 'user-comment-body-container' : 'user-comment-body-container-update'}>
        <div className='user-username-and-time'>
          <div className='username-toggle-menu'>
            <p className='username'>{comment.user}</p>
            <div className='toggle-container'>
              <p onClick={() => setTogglesEvent(pre => ({ ...defaultEvent, menu: !pre.menu }))}><span><CiMenuKebab className='toggle-control' /></span></p>
              {togglesEvent.menu && <UserControl hasDeletePermission={hasPermission} comment_id={comment.id} />}
            </div>
          </div>
          <p className='time-since-commmented'>{comment.time_period}</p>
        </div>
        <div className={togglesEvent.edit ? 'user-comment-body-display-none' : 'user-comment-body'}>
          <p className='comment'>{comment.body}</p>
          <div className='vote-container'>
            <button disabled={!autheticated} onClick={() => handleOnClickVote('like')}>{votes.like ? <AiFillLike /> : <AiOutlineLike />} {comment.like}</button>
            <button disabled={!autheticated} onClick={() => handleOnClickVote('disLike')}>{votes.disLike ? <AiFillDislike /> : <AiOutlineDislike />} {comment.dislike}</button>
            <button onClick={() => setTogglesEvent(pre => ({ ...defaultEvent, reply: !pre.reply }))}>Reply<BsReply /> {comment.sub_comments.length}</button>
            <button onClick={() => setTogglesEvent(pre => ({ ...defaultEvent, addReply: !pre.addReply }))}>Add<IoIosAddCircleOutline /></button>
            {hasPermission && <button onClick={() => setTogglesEvent(pre => ({ ...defaultEvent, edit: !pre.edit }))}>Edit<MdOutlineEditCalendar /></button>}
          </div>
        </div>
      </div>

      <div className='comment-subcomment'>
        {togglesEvent.addReply && <AuthenticateUser isreply={comment.id} />}  {/* here the isreply is for the reply comment id it store the reply comment id here */}
        {togglesEvent.edit && hasPermission && <UpdateComment edit={setTogglesEvent} comment_id={comment.id} />}
        {togglesEvent.reply && subComments.map(sub => <UserComment comment={sub} key={sub.id} />)}
      </div>
    </section>
  )
}

export default UserComment
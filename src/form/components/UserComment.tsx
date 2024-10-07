import React, { useState } from 'react'
import UserAvatar from './UserAvatar'
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineDislike, AiOutlineLike,AiFillLike,AiFillDislike
} from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineEditCalendar } from "react-icons/md";
import AuthenticateUser from './AuthenticateUser';
import UserControl from './UserControl';
import UpdateComment from './UpdateComment';

interface ToggleEvents {
  reply: boolean,
  addReply: boolean,
  edit: boolean,
  menu: boolean
}
interface VoteEvent{
  like : boolean,
  disLike : boolean,
}

const UserComment: React.FC = () => {
  const defaultState: ToggleEvents = {
    addReply: false,
    edit: false,
    menu: false,
    reply: false
  }
  const defaultVote:VoteEvent = {
    disLike : false,
    like : false
  }
  const [togglesEvent, setTogglesEvent] = useState<ToggleEvents>({
    addReply: false,
    edit: false,
    menu: false,
    reply: false
  });
  const [votes,setVotes] = useState<VoteEvent>(defaultVote);

  return (
    <section className='user-comment-container'>
      <UserAvatar />
      <div className={!togglesEvent.edit?'user-comment-body-container':'user-comment-body-container-update'}>
        <div className='user-username-and-time'>
          <div className='username-toggle-menu'>
            <p className='username'>Username</p>
            <div className='toggle-container'>
              <p onClick={() => setTogglesEvent(pre => ({ ...defaultState, menu: !pre.menu }))}><span><CiMenuKebab className='toggle-control' /></span></p>
              {togglesEvent.menu && <UserControl />}
            </div>
          </div>
          <p className='time-since-commmented'>2 days ago</p>
        </div>
        <div className={togglesEvent.edit ? 'user-comment-body-display-none' : 'user-comment-body'}>
          <p className='comment'>User comment body</p>
          <div className='vote-container'>
            <button onClick={()=>setVotes(pre=>({...defaultVote,like : !pre.like}))}>{votes.like ? <AiFillLike/>:<AiOutlineLike/>} 0</button>
            <button onClick={()=>setVotes(pre=>({...defaultVote,disLike : !pre.disLike}))}>{votes.disLike ? <AiFillDislike/>:<AiOutlineDislike/>} 0</button>
            <button onClick={() => setTogglesEvent(pre => ({ ...defaultState, reply: !pre.reply }))}>Reply<BsReply /> 0</button>
            <button onClick={() => setTogglesEvent(pre => ({ ...defaultState, addReply: !pre.addReply }))}>Add<IoIosAddCircleOutline /></button>
            <button onClick={() => setTogglesEvent(pre => ({ ...defaultState, edit: !pre.edit }))}>Edit<MdOutlineEditCalendar /></button>
          </div>
        </div>
      </div>
      <div className={togglesEvent.reply ? `comment-subcomment ${'slideIn'}`:`comment-subcomment`}>
      {togglesEvent.addReply && <AuthenticateUser />}
      {togglesEvent.edit && <UpdateComment edit={setTogglesEvent} />}
      {togglesEvent.reply && <UserComment />}
      </div>
    </section>
  )
}

export default UserComment
import React, { useState,useContext } from 'react'
import { HiMiniChevronDown } from "react-icons/hi2";
import PostEmoji from '../PostEmoji';
import LoginOptions from '../LoginOptions';
import UserComment from '../UserComment';
import AuthenticateUser from '../AuthenticateUser';
import { commentContext } from '../../store/commentStore/CommentStore';
import { authContext } from '../../store/authStore/AuthStore';

const Comment: React.FC = () => {
  const [loginOptions, setLoginOptions] = useState<boolean>(false);
  const {mainComments} = useContext(commentContext);
  const {autheticated,logout} = useContext(authContext);
  const content = mainComments.map(comment=> <UserComment key={comment.id} comment={comment}/>)

  const handleLogout = ()=>{
    const reponse = confirm("Do you want to Logout ?");
    if(reponse){
      logout();
    }
  }
  return (
    <div className='main-comment-section-container'>
      <PostEmoji />
      <div className='comment-section-container'>
        <div className='comment-login-status'>
          <p><span>{mainComments.length}</span> Comments</p>
          <div className='login-opt'>
            <p onClick={() => setLoginOptions(pre => !pre)}>{!autheticated? <span>Login</span>:<span onClick={handleLogout}>Logout</span> } <HiMiniChevronDown /></p>
            {!autheticated && loginOptions && <LoginOptions />}
          </div>
        </div>
        <AuthenticateUser isreply={0} />   {/* note here the isreply is consider 0 means this will served as the main comment form for user not an reply comment  */}
        <div className='comments-list-container'>
          {content}
        </div>
      </div>
    </div>
  )
}

export default Comment
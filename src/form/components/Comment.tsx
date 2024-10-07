import React, { useState } from 'react'
import { HiMiniChevronDown } from "react-icons/hi2";
import PostEmoji from './PostEmoji';
import LoginOptions from './LoginOptions';
import AuthenticateUser from './AuthenticateUser';
import UserComment from './UserComment';

const Comment: React.FC = () => {
  const [loginOptions, setLoginOptions] = useState<boolean>(false);

  return (
    <div className='main-comment-section-container'>
      <PostEmoji />
      <div className='comment-section-container'>
        <div className='comment-login-status'>
          <p><span>0</span> Comments</p>
          <div className='login-opt'>
            <p onClick={() => setLoginOptions(pre => !pre)}><span>1</span> Login <HiMiniChevronDown /></p>
            {loginOptions && <LoginOptions />}
          </div>
        </div>
        <AuthenticateUser/>
        <div className='comments-list-container'>
          <UserComment/>
        </div>
      </div>
    </div>
  )
}

export default Comment
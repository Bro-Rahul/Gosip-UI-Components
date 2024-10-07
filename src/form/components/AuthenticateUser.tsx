import React, { useState } from 'react'
import SocialLogin from './SocialLogin'
import CommenterAvatar from './CommenterAvatar'
import CreateUserForm from '../form/CreateUserForm'
import CommentForm from '../form/CommentForm'
import LoginUserForm from '../form/LoginUserForm'
const AuthenticateUser: React.FC = () => {
    const [loginForm,setLoginForm] = useState<boolean>(false);

    return (
        <article className='display-form-and-comment-container'>
            <div className='comment-form-container'>
                <CommenterAvatar />
                <CommentForm />
            </div>
            <div className='login-user-container'>
                <div className='login-social-gosip-container'>
                    <SocialLogin />
                    {!loginForm ? <CreateUserForm toggleForm={setLoginForm}/>:<LoginUserForm toggleForm={setLoginForm}/>}
                </div>
            </div>
        </article>

    )
}

export default AuthenticateUser
import React, { useContext,useState } from 'react'
import SocialLogin from '../SocialLogin'
import CommenterAvatar from '../CommentAvatar'
import CreateUserForm from '../../form/CreateUserForm'
import CommentForm from '../../form/CommentForm'
import { authContext } from '../../store/authStore/AuthStore'
import LoginUserForm from '../../form/LoginUserForm'
interface AuthenticateUserProps{
    isreply : number,
}

const AuthenticateUser: React.FC<AuthenticateUserProps> = ({isreply}) => {
    const { autheticated } = useContext(authContext);
    const [loginForm,setLoginForm] = useState<boolean>(false);

    return (
        <article className='display-form-and-comment-container'>
            <div className='comment-form-container'>
                <CommenterAvatar />
                <CommentForm reply_id={isreply} />
            </div>
            <div className='login-user-container'>
                {!autheticated && <div className='login-social-gosip-container'>
                    <SocialLogin />
                    {!loginForm ? <CreateUserForm toggleForm={setLoginForm}/>:<LoginUserForm toggleForm={setLoginForm}/>}
                </div>}
            </div>
        </article>

    )
}

export default AuthenticateUser
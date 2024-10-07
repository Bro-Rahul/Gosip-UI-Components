import React,{useContext} from 'react'
import { authContext } from '../../store/authStore/AuthStore'
const CommenterAvatar:React.FC = () => {
  const {autheticated,commenter:{profile}} = useContext(authContext);
    const defaultSrc = 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1720224000&semt=ais_user'
    const src:string = autheticated ? !profile ? defaultSrc : `http://127.0.0.1:8000${profile}` : defaultSrc;
    return (
        <div className='commenter-avatar'>
        <img src={src} alt="user profile picture" />
      </div>
    )
}

export default CommenterAvatar
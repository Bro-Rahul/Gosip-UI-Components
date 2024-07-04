import React from 'react'
import { authContext } from '../../store/storeProvider/CommentProvider'
import { useContext } from 'react'
import DefaultImage from './DefaultAvatar'
const UserAvatar:React.FC = () => {
    const {commenter,autheticated} = useContext(authContext);
    return (
        <div>
            <div className='useravatar'>
                {commenter.profile?
                <img src={`http://127.0.0.1:8000/${commenter.profile}`} />:autheticated ? 
                    <DefaultImage username={commenter.username!} /> : <img src='https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1720051200&semt=ais_user'/>
                }
            </div>
        </div>
    )
}

export default UserAvatar
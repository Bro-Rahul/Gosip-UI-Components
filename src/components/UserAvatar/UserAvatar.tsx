import React from 'react'

const UserAvatar:React.FC<{profile:string|null,user:string}> = (props) => {
  const image = !props.profile ? ( <div className='default-avatar'>{props.user[0]}</div>):<img className='user-avatar-profile' src={`http://127.0.0.1:8000${props.profile}`} alt='user-profile'/>
  return (
    <div className='user-avatar-container'>
       {image}
    </div>
  )
}

export default UserAvatar
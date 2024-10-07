import React, { useContext } from 'react'
import { commentContext } from '../../store/commentStore/CommentStore'
import { authContext } from '../../store/authStore/AuthStore';

interface UserControlProps{
  hasDeletePermission : boolean,
  comment_id : number
}

const UserControl:React.FC<UserControlProps> = ({hasDeletePermission,comment_id}) => {
  const {deleteComment} = useContext(commentContext);
  const {commenter} = useContext(authContext);
  return (
    <ul className='toggle-control-options-list'>
        {hasDeletePermission && <li onClick={()=>deleteComment({id:comment_id,token:commenter.token})}>Delete</li>}
        <li>Block User</li>
        <li>Report</li>
    </ul>
  )
}

export default UserControl
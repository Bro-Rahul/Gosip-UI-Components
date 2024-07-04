import React from "react"
import { authContext } from "../../store/storeProvider/CommentProvider"
import { useContext } from "react"
import { commentContext } from "../../store/baseProvider/BaseProvider"
import { CommentSchema } from "../../model"

const ControlMenu:React.FC <{comment:CommentSchema}>= (props) => {
  const {commenter,key} = useContext(authContext);
  const {deleteComment,id} = useContext(commentContext);
  const canDelete = commenter.username === props.comment.user 
  return (
    <ul className="control-list">
        {canDelete && <li onClick={()=>deleteComment({id:props.comment.id,identity:id,key:key,token:commenter.token!})}>delete</li>}
        <li>block user</li>
        <li>report</li>
    </ul>
  )
}
export default ControlMenu
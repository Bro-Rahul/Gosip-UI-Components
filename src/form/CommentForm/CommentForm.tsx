import React from 'react'
import PostComment from '../../components/PostComment';
import CreateUserForm from '../../form/CreateUserForm'
import UserAvatar from '../../components/UserAvatar';
import { authContext, ContextSechema } from '../../store/storeProvider/CommentProvider';
import { useContext } from 'react';

const CommentForm:React.FC<{isReplyComment : number,disableAddComment: (value: boolean) => void}> = (props) => {
    const { autheticated } = useContext<ContextSechema>(authContext)
    return (
        <div className='comment-form-container'>
            <div className='comment-form-top'>
                <UserAvatar />
                <PostComment isReply={props.isReplyComment} handleDiable = {props.disableAddComment} />
            </div>
            {!autheticated &&
                <div className='comment-from-create-user'>
                    <CreateUserForm />
                </div>
            }
        </div>
    )
}

export default CommentForm
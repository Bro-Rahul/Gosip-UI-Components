import React from 'react'
import PostComment from '../../components/PostComment';
import CreateUserForm from '../../form/CreateUserForm'
import UserAvatar from '../../components/UserAvatar';

const CommentForm = () => {
    return (
        <div className='comment-form-container'>
            <div className='comment-form-top'>
                <UserAvatar/>
                <PostComment/>
            </div>
            <div className='comment-from-create-user'>
                <CreateUserForm />
            </div>
        </div>
    )
}

export default CommentForm
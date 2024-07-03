import React from 'react'
import PostComment from '../../components/PostComment';
import CreateUserForm from '../../form/CreateUserForm'
import UserAvatar from '../../components/UserAvatar';
import { authContext, ContextSechema } from '../../store/storeProvider/CommentProvider';
import { useContext } from 'react';

const CommentForm = () => {
    const { autheticated } = useContext<ContextSechema>(authContext)
    return (
        <div className='comment-form-container'>
            <div className='comment-form-top'>
                <UserAvatar />
                <PostComment />
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
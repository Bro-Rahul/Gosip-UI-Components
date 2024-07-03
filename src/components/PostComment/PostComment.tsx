import React from 'react'
import { MdOutlineGifBox } from "react-icons/md";
import { FaBold } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { FiUnderline } from "react-icons/fi";
import { GoMention } from "react-icons/go";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { PostCommentsOnThePost } from '../../../http';

const PostComment = () => {
    type CommentBody = {
        body: string;
    };

    const schema: ZodType<CommentBody> = z.object({
        body: z.string().min(3, "Comment must be at least 3 characters long")
    });

    const { register, handleSubmit, formState: { errors } } = useForm<CommentBody>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: CommentBody) => {
        console.log(data);
    };

    return (
        <form className='postcomment-form' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea className='postcomment-form-test-area' placeholder='Join the discussion...' {...register('body')} />
            </div>
            <p className='error'>{errors.body?.message}</p>
            <div className='postcomment-form-attachment-btns'>
                <div>
                    <button type='button'><MdOutlineGifBox /></button>
                    <button type='button'><FaRegImage /></button>
                    <button type='button'><FaBold /></button>
                    <button type='button'><FiUnderline /></button>
                    <button type='button'><GoMention /></button>
                </div>
                <button className='comment-btn'>Comment</button>
            </div>
        </form>
    );
}

export default PostComment;

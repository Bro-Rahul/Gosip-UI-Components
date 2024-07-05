import React from 'react'
import { MdOutlineGifBox } from "react-icons/md";
import { FaBold } from "react-icons/fa6";
import { FaRegImage } from "react-icons/fa";
import { FiUnderline } from "react-icons/fi";
import { GoMention } from "react-icons/go";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { commentContext } from '../../store/baseProvider/BaseProvider';
import { useContext } from 'react';
import { authContext } from '../../store/storeProvider/CommentProvider';
import { UpdateCommentSechema } from '../../model';

const UpdateCommentForm: React.FC<{cancelUpdate:React.Dispatch<React.SetStateAction<boolean>>,commentId:number}> = (props) => {

  const {comments,updateUserComment,id} = useContext(commentContext);
  const {commenter} = useContext(authContext)
  const comment = comments.find(item=>item.id === props.commentId);


  type CommentBody = {
    body: string;
  };
  const schema: ZodType<CommentBody> = z.object({
    body: z.string().min(3, "Comment must be at least 3 characters long")
  });

  const { register, handleSubmit, formState: { errors } } = useForm<CommentBody>({
    resolver: zodResolver(schema),
    defaultValues: {
      body : comment?.body || ''
    }
  });

  const onSubmit = (data: CommentBody) => {
    const body:UpdateCommentSechema = {
      body : data.body,
      id : props.commentId,
      post : id,
      created_by : +commenter.id,
      token : commenter.token!
    }
    updateUserComment(body);
    console.log(data);
  };

  return (
    <div className='update-user-comment-container'>
      <form className='postcomment-form' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea className='postcomment-form-test-area' placeholder='Join the discussion...'  {...register('body')} />
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
          <div>
          <button type='button' onClick={()=> props.cancelUpdate(false)} className='comment-btn'>Cancel</button>
          <button className='comment-btn'>Save Comment</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateCommentForm
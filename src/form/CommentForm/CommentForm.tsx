import React,{useContext} from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod';
import { commentContext } from '../../store/commentStore/CommentStore'; 
import { authContext } from '../../store/authStore/AuthStore';

interface CommentFormProps{
    reply_id : number    // this will be store the id
}

const CommentForm: React.FC<CommentFormProps> = ({reply_id}) => {
    const {commenter,autheticated} = useContext(authContext);
    const  {post_id,addReplyComment,addComment} = useContext(commentContext);
    type CommentBody = {
        body: string;
    };

    const schema: ZodType<CommentBody> = z.object({
        body: z.string().min(3, "Comment must be at least 3 characters long")
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentBody>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: CommentBody) => {
        console.log(data);
        if(autheticated){
            if(reply_id){
                addReplyComment({body:data.body,created_by:commenter.id,post:post_id,reply:reply_id,token:commenter.token});
            }else{
                addComment({body:data.body,created_by:commenter.id,post:post_id,token:commenter.token});
            }
        }else{
            alert('please login first to add a comment');
        }
        reset()
    };

    return (
        <form className='comment-form' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <textarea className='textarea' placeholder='Join The Discussion...'  {...register('body')}></textarea>
                <p className='error'>{errors.body?.message}</p>
            </div>
            <div>
                <button className='comment-btn'>Comment</button>
            </div>
        </form>
    );
}

export default CommentForm;
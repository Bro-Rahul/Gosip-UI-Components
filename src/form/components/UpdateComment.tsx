import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodType } from 'zod'

interface UpdateCommentProps {
    edit: React.Dispatch<React.SetStateAction<{
        addReply: boolean,
        edit: boolean,
        menu: boolean,
        reply: boolean
    }>>
}

const UpdateComment: React.FC<UpdateCommentProps> = ({ edit }) => {
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
        console.log(data)
        edit(({ addReply: false, edit: false, menu: false, reply: false }))
        reset()
    };
    return (
        <div className='comment-form-container-update'>
            <form className='comment-form' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <textarea className='textarea' placeholder='Join The Discussion...'  {...register('body')}></textarea>
                    <p className='error'>{errors.body?.message}</p>
                </div>
                <div>
                    <button onClick={()=>edit(pre=>({...pre,edit:false}))} className='comment-btn'>Cancel Edit</button>
                    <button className='comment-btn'>Comment</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateComment
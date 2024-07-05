interface CommentSchema{
    id:number,
    sub_comments:CommentSchema[],
    created_by : number,
    post:number,
    user:string,
    time_period : string,
    profile:string|null,
    created_at : string,
    updated_at : string,
    body : string,
    like : number|null,
    dislike : number|null,
    upvote : number|null, 
}

interface PostSchema{
    id:number,
    body : string,
    comments : CommentSchema[],
    title : string|null,
    image : string|null,
    created_by : number|string
}

interface PostCommentSchema{
    user_post: PostSchema,
    identity : string
}

interface SecretKeyAndIdentitySchema{
    key : string,
    identity : string,
}
interface AddCommentTypeSchema{
    created_by:number|string,
    post : number|string,
    body : string,
}
interface ReplyCommentSchema{
    created_by:number|string,
    post : string,
    body : string,
    reply : string|number
    key : string,
}
interface DeleteCommentSchema{
    id : number,
    token : string,
    key : string,
    identity : string
}
interface UpdateCommentSechema{
    id : number,
    body : string,
    token : string,
    created_by : number,
    post:string
}

export {PostCommentSchema,CommentSchema,PostSchema,SecretKeyAndIdentitySchema,AddCommentTypeSchema,ReplyCommentSchema,DeleteCommentSchema,UpdateCommentSechema}
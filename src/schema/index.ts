interface SecretKeyIdentitySchema{
    key:string,
    identity : string;
    post : MetaDataSchema,
}

interface SecretKeyIdentityCommenterIdSchema{
    key : string,
    identity : string,
    post : MetaDataSchema,
    user_id : number|null
}

interface CommentSchema{
    id : number,
    sub_comments : number[], // this will store the subcomments id init 
    user : string, // this is name of the user who created the commented it is the unique id 
    profile : string|null,  // this is profile picture
    time_period : string,
    post : number // this field is same as the id of the user_post 
    vote : string|null // this is for the like/dislike vote
    like : number,
    dislike : number,
    created_at : string
    created_by : number
    body : string
}

interface PostCommentSchema{
    user_post : {
        id : number // this is the post id auto increament django,
        body : string,
        comments : CommentSchema[]
        title : string,
        image : string|null,
        created_by : number
    },
    identity : string  // this is provided bt the user in the comment-section component 
}
interface MetaDataSchema{
    body : string,
    title : string,
    image : string|null
}

interface AddCommentSchema{
    created_by : number,
    post : number,
    body : string,
    token : string,
}
interface ReplyCommentSchema{
    created_by:number,
    post : number,
    body : string,
    reply : number,
    token : string,
}
interface DeleteCommentSchema{
    id : number,
    token : string,
}
interface UpdateCommentSechema{
    id : number,
    body : string,
    token : string,
    created_by : number,
    post : number
}
interface PostSchema{
    title : string,
    created_by : number,
    image : string|null,
    body : string
}
interface CommenterUserData{
    token :string,
    id : number,   // this commenter user id can be use to check the permissions
    profile : string|null
}

interface UserForm{
    username : string,
    password : string,
    email : string
}

interface VoteSchema{
    user : number,
    comment : number,
    vote : null|string
}


export {
    PostCommentSchema,
    CommentSchema,
    SecretKeyIdentitySchema,
    SecretKeyIdentityCommenterIdSchema,
    AddCommentSchema,
    ReplyCommentSchema,
    DeleteCommentSchema,
    UpdateCommentSechema,
    MetaDataSchema,
    PostSchema,
    CommenterUserData,
    UserForm,
    VoteSchema
}
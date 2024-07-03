interface Comments{
    id:number,
    sub_comments:Comments[],
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

interface Post{
    id:number,
    body : string,
    comments : Comments[],
    title : string|null,
    image : string|null,
    created_by : number|string
}

interface PostComments{
    user_post: Post,
    identity : string
}


/* interface CommentorData{
    username : string,
    website_url : string|null,
    email : string|null
} */

/* interface PostUserData{
    username : string,
    password : string,
    cpassword : string,
}
 */

export {PostComments,Comments,Post}
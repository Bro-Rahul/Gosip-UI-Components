interface Comments{
    id:number,
    sub_comments:Comments[],
    created_by : number,
    post:number,
    user:string,
    period : string,
    avatar:string,
    created_at : string,
    updated_at : string,
    body : string,
    like : number|null,
    dislike : number|null,
    upvote : number|null, 
}

interface PostComments{
    sub_url : string,
    post : {
        id: number,
        body : string,
        comments : Comments[],
        title : string,
        image : string,
        created_by:number,
    },
    base_url : string,
    complete_url : string,
}

interface CommentorData{
    username : string,
    website_url : string|null,
    email : string|null
}

interface PostUserData{
    username : string,
    password : string,
    cpassword : string,
}


export {PostComments,Comments,CommentorData,PostUserData}
import
    {   PostCommentSchema,
        CommentSchema,
        AddCommentSchema,
        SecretKeyIdentitySchema,
        UserForm,
        CommenterUserData,
        ReplyCommentSchema,
        UpdateCommentSechema,
        DeleteCommentSchema
    } 
from "./src/schema";

import { filterSubComments } from "./utils";

const baseurl:string = 'http://127.0.0.1:8000'


export async function fetchPostComments(user:SecretKeyIdentitySchema):Promise<PostCommentSchema> {
    const url = 'http://127.0.0.1:8000/posts/get-comments/'
    const response = await fetch(url, {
        method: "POST",
        body:JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = new Error("Something went wrong");
        const errorResponse = await response.json(); // Await the response to get the error information
        throw error;
    }

    const [data] = await response.json();
    return data
}


export async function PostCommentsOnThePost(data:AddCommentSchema):Promise<CommentSchema>{
    const url = `${baseurl}/posts-comment/`
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'content-type' : 'application/json',
            'Authorization' : `token ${data.token}`
        },
        body : JSON.stringify(data),

    })
    if (!response.ok){
        const error = new Error("Can 't post the comment for some reason !")
        throw error
    }
    return response.json()
}


export async function fetchUserData(data:UserForm):Promise<CommenterUserData>{
    const url = `${baseurl}/auth/`
    const response = await fetch(url,{
        method:'POST',
        body : JSON.stringify(data),
        headers:{
            'content-type' : 'application/json'
        }
    })
    if(!response.ok){
        const error = new Error('Can not create a user')
        const message = response.json()
        console.log(message)
        throw error
    }
    return response.json()
}


export async function PostReplyCommentOnPost(data:ReplyCommentSchema):Promise<CommentSchema>{
    const url = `${baseurl}/posts-comment/comment-reply/`
    const body = {
        reply : data.reply,
        post : data.post,
        body : data.body,
        created_by : data.created_by
    }
    const response = await fetch(url,{
        method:"POST",
        body : JSON.stringify(body),
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `token ${data.token}`
        }
    })
    if(!response.ok){
        const error = new Error("Can't post the comment reply ")
        throw error
    }
    return response.json()
}

export async function updateUserComment(body:UpdateCommentSechema):Promise<CommentSchema>{
    const url = `${baseurl}/posts-comment/${body.id}/update-user-comment/`
    const data = {
        post : body.post,
        created_by : body.created_by,
        body : body.body
    }
    const response = await fetch(url,{
        method : "PATCH",
        body : JSON.stringify(body),
        headers:{
            'content-type' : 'application/json',
            'Authorization' : `token ${body.token}`
        }
    });
    if(!response.ok){
        const err = new Error('Cant update the comment ');
        throw err;
    }
    return response.json();
}

export async function deleteUserComment(body:DeleteCommentSchema):Promise<number>{
    const url = `${baseurl}/posts-comment/${body.id}/delete-comment/`
    const response = await fetch(url,{
        method : "DELETE",
        headers:{
            'content-type' : 'application/json',
            'Authorization' : `token ${body.token}`
        }
    })
    if(!response.ok){
        const error = new Error('Can not delete the comment for some reason ')
        throw error
    }
    return body.id;
}
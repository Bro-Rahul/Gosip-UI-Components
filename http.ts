import {PostCommentSchema,AddCommentTypeSchema,ReplyCommentSchema,DeleteCommentSchema,UpdateCommentSechema} from "./src/model";
import { CommentUserData } from "./src/store/storeProvider/CommentProvider";
import { CommentSchema } from "./src/model/index";

const baseurl = 'http://127.0.0.1:8000'


interface fetchPostCommentsBody{
    key:string,
    identity:string
}

export async function fetchPostComments(user:fetchPostCommentsBody):Promise<PostCommentSchema> {
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

interface UserCredencials{
    username : string,
    password : string,
}

type UserFormType = {
    username: string;
    password: string;
    cpassword: string;
    email: string;
}

export async function fetchUserData(data:UserFormType):Promise<CommentUserData>{
    const url = `${baseurl}/auth/`
    const body:UserCredencials = {
        username : data.username,
        password : data.password
    }
    const response = await fetch(url,{
        method:'POST',
        body : JSON.stringify(body),
        headers:{
            'content-type' : 'application/json'
        }
    })
    if(!response.ok){
        const error = new Error('Can not create a user')
        const message = response.json()
        throw error
    }
    return response.json()
}



export async function PostCommentsOnThePost(data:AddCommentTypeSchema):Promise<CommentSchema>{
    const url = `${baseurl}/posts-comment/`
    const response = await fetch(url,{
        method:'POST',
        headers:{
            'content-type' : 'application/json'
        },
        body : JSON.stringify(data),

    })
    if (!response.ok){
        const error = new Error("Can 't post the comment for some reason !")
        throw error
    }
    return response.json()
}

export async function PostReplyCommentOnPost(data:ReplyCommentSchema):Promise<PostCommentSchema>{
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
            'content-type' : 'application/json'
        }
    })
    if(!response.ok){
        const error = new Error("Can't post the comment reply ")
        throw error
    }
    return fetchPostComments({identity : data.post,key:data.key})
}


export async function deleteComment(body:DeleteCommentSchema){
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
    return fetchPostComments({identity : body.identity,key : body.key});
}

export async function updateComment(comment:UpdateCommentSechema):Promise<CommentSchema>{
    const url = `${baseurl}/posts-comment/${comment.id}/update-user-comment/`;
    const patchData = {
        post : comment.post,
        created_by : comment.created_by,
        body:comment.body
    }
    const response = await fetch(url,{
        method:"PATCH",
        body : JSON.stringify(patchData),
        headers : {
            'content-type' : 'application/json',
            'Authorization' : `token ${comment.token}`
        }
    });
    if(!response.ok){
        const error = new Error("can't update the post in the backend for some reason!")
        alert("can 't update the comment at this moment please try again later !")
        throw error
    }
    return response.json();
}
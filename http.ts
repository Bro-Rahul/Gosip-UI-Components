import {PostComments} from "./src/model";
import { CommentUserData } from "./src/store/storeProvider/CommentProvider";
import { Comments } from "./src/model/index";

const baseurl = 'http://127.0.0.1:8000'


interface fetchPostCommentsBody{
    key:string,
    identity:string
}

export async function fetchPostComments(user:fetchPostCommentsBody):Promise<PostComments> {
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



export async function PostCommentsOnThePost(data:any):Promise<Comments>{
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
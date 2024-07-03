import {PostComments} from "./src/model";

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


/* export async function createUser(data:PostUserData):Promise<CommentorData>{
    const url = `${baseurl}/users/create-commentor/`
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
        throw error
    }
    return response.json()
} */
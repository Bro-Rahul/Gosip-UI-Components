import { PostComments,CommentorData ,PostUserData} from "./src/model";


const baseurl = 'http://127.0.0.1:8000'
export async function fetchPostComments(slug:string):Promise<PostComments> {
    const token = "46837b41ec3663c3d4a3caf85f329970390b92f5";  // Your actual token
    const url = `http://127.0.0.1:8000/thread/${slug}/get-posts-comments`
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `token ${token}`,  // Correct way to include the token
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = new Error("Something went wrong");
        const errorResponse = await response.json(); // Await the response to get the error information
        throw error;
    }

    return await response.json();
}


export async function createUser(data:PostUserData):Promise<CommentorData>{
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
}
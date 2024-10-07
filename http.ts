import
    {   PostCommentSchema,
        CommentSchema,
        AddCommentSchema,
        SecretKeyIdentitySchema,
        UserForm,
        CommenterUserData,
        ReplyCommentSchema,
        UpdateCommentSechema,
        DeleteCommentSchema,
        VoteSchema,
        LoginForm,
        VerifyEmail
    } 
from "./src/schema";

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

export async function createNewUser(body:UserForm) :Promise<boolean>{
    const url = `${baseurl}/users/create-commentor/`;
    const response = await fetch(url,{
        method : 'POST',
        headers:{
            'content-type' : 'application/json',
        },
        body : JSON.stringify(body),
    })
    if(!response.ok){
        throw new Error("Can't create user for some reason");
    }
    return true;
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


export async function fetchUserData(data:LoginForm):Promise<CommenterUserData>{
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

export async function handleVoteOnComments(body:VoteSchema):Promise<{vote:string|null}>{
    const url = `${baseurl}/comment/handle-like-dislike/`
    const response = await fetch(url,{
        method : "POST",
        headers : {
            'content-type' : 'application/json',
        },
        body:JSON.stringify(body)
    });
    if(!response.ok){
        const err = new Error('cant record the vote at this moment !');
        throw err;
    }
    return response.json();
}
export async function sendOTP(email:string) {
    const url = `${baseurl}/users/generate-otp-code/`;
    const request = await fetch(url,{
        method : 'POST',
        headers : {
            'content-type' : 'application/json',
        },
        body : JSON.stringify(email)
    });
    if(!request.ok){
        const err = new Error("Can't generate the otp for some reason !");
        throw err;
    }
    return request.json();
}

export async function validateOTP(otp:VerifyEmail) :Promise<boolean>{
    const url = `${baseurl}/users/verify-otp-code/`;
    const request = await fetch(url,{
        method : 'POST',
        headers : {
            'content-type' : 'application/json',
        },
        body : JSON.stringify(otp)
    });
    if(!request.ok){
        const err = new Error("Invalid OTP please enter valid OTP !");
        throw err;
    }
    return true;
}
export async function forgetPasswordOTPSend(username:string){
    const url = `${baseurl}/users-forget-password/${username}/send-otp`
    const response = await fetch(url)
    if(!response.ok){
        throw new Error("Can't send the OTP ")
    }
    return response.json();
}

export async function forgetPasswordOTPVerify(username:string,otp:string){
    const url = `${baseurl}/users-forget-password/verify-otp/`
    const response = await fetch(url,{
        method:"POST",
        headers : {
            'content-type' : 'application/json',
        },
        body : JSON.stringify({username:username,code:otp})        
    });
    if(!response.ok){
        throw new Error("Can't send the OTP ")
    }
    return response.json();
}
export async function changePassword(data:LoginForm,otp:string){
    const url = `${baseurl}/users-forget-password/change-password/`

    const response = await fetch(url,{
        method : "POST",
        headers : {
            'content-type' : 'application/json',
        },
        body : JSON.stringify({...data,code:otp})        
    })
    if(!response.ok){
        throw new Error("Can't change the password ")
    }
    return response.json();
}
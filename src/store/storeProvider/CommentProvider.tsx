import React, { createContext, ReactNode, useState } from "react";

interface CommentUserData{
  token : string|null,
  id : number|string,
  username : string|null,
  role : string|null,
  email : string|null,
  profile : string|null
}

interface ContextSechema {
  key : string,
  commenter : CommentUserData,
  autheticated : boolean,
  login : (userdata:CommentUserData)=>void
}

export const authContext = createContext<ContextSechema>({
  key : '',
  commenter : {
    email:null,
    id : '',
    role :null,
    token :null,
    username :null,
    profile : null
  },
  autheticated : false,
  login : (userData:CommentUserData)=>{}
});

const CommentProvider: React.FC<{ auth:string,children: ReactNode}> = (props) => {
  const user = localStorage.getItem('user') === null
  let commenterUser:CommentUserData;
  let authenticate = false;
  if (user===true){
    commenterUser = {
        email:null,
        id : '',
        role :null,
        token :null,
        username :null,
        profile:null
      }
  }else{
    const data:any = localStorage.getItem('user')
    commenterUser = JSON.parse(data);
    authenticate = true;
  }

 const [contextValue,setContextValue] = useState<ContextSechema>({
  key : props.auth,
  commenter : commenterUser,
  login : (userData:CommentUserData)=>{
    setContextValue(pre=>({
      ...pre,
      commenter : {
        ...pre.commenter,
        email : userData.email,
        token : userData.token,
        id : userData.id,
        role : userData.role,
        username : userData.username,
        profile : userData.profile
      },
      autheticated : true,
    }));
  },
  autheticated : authenticate
 });

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export {CommentUserData,ContextSechema}
export default CommentProvider;

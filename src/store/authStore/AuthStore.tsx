import React, { createContext, ReactNode, useState } from "react";
import { CommenterUserData } from "../../schema";



interface AuthContextSchema {
  key: string,   // this key is the secret key fot the publisher user 
  commenter: CommenterUserData,   // this is the another user that will comment(commenter user)
  autheticated: boolean,
  login: (userdata: CommenterUserData) => void,
  logout : ()=> void,
}

export const authContext = createContext<AuthContextSchema>({
  key: '',
  commenter: {
    id: -1,
    token: '',
    profile: null
  },
  autheticated: false,
  login: (userData: CommenterUserData) => { },
  logout : ()=> {},
});

const CommentProvider: React.FC<{ client_id: string, children: ReactNode }> = (props) => {
  const user = localStorage.getItem('user') === null
  let commenterUser: CommenterUserData;
  let authenticate = false;
  if (user === true) {
    commenterUser = {
      id: -1,  // initail with -1 becouse id is always a positive value 
      token: '',
      profile: null
    }
  } else {
    const data:any = localStorage.getItem('user')
    commenterUser = JSON.parse(data);
    authenticate = true;
  }

  const [contextValue, setContextValue] = useState<AuthContextSchema>({
    key: props.client_id,
    commenter: commenterUser,
    login: (userData: CommenterUserData) => {
      setContextValue(pre => ({
        ...pre,
        commenter: {
          ...pre.commenter,
          token: userData.token,
          id: userData.id,
          profile: userData.profile
        },
        autheticated: true,
      }));
    },
    logout : ()=>{
      localStorage.clear();
      setContextValue(pre=>({
        ...pre,
        autheticated : false,
        commenter : {
          id : -1,
          profile : '',
          token : ''
        }
      }))
    },
    autheticated: authenticate
  });

  return (
    <authContext.Provider value={contextValue}>
      {props.children}
    </authContext.Provider>
  );
};

export { AuthContextSchema }
export default CommentProvider;
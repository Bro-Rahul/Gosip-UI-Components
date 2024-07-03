import React, { createContext, ReactNode } from "react";



export const authContext = createContext<string>('');

const CommentProvider: React.FC<{ auth:string,children: ReactNode}> = (props) => {

  return (
    <authContext.Provider value={props.auth}>
      {props.children}
    </authContext.Provider>
  );
};

export default CommentProvider;
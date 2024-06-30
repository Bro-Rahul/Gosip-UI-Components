import React, { createContext, useState, ReactNode } from "react";

export type AuthenticateUser = {
  id: number | null;
  username: string;
  token: string;
  role: string;
  website_url: string;
  email: string;
};

export const authContext = createContext<AuthenticateUser>({
  id: null,
  username: '',
  token: '',
  role: '',
  website_url: '',
  email: '',
});

const CommentProvider: React.FC<{ auth:AuthenticateUser,children: ReactNode}> = (props) => {
  const [logUser, setLogUser] = useState<AuthenticateUser>(props.auth);

  return (
    <authContext.Provider value={logUser}>
      {props.children}
    </authContext.Provider>
  );
};

export default CommentProvider;
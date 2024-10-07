import React, { useState } from "react";
import ForgetPasswordForm from "../ForgetPasswordForm";
import { z,ZodType } from "zod";
import { LoginForm } from "../../schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchUserData } from "../../../http";


const LoginUserForm: React.FC<{ toggleForm: React.Dispatch<React.SetStateAction<boolean>> }> = ({ toggleForm }) => {
  
  const [forgetPassword, setForgetPassword] = useState<boolean>(true);
  const schema:ZodType<LoginForm> = z.object({
    username : z.string().min(3).max(150),
    password : z.string().min(5,"password length must be greater then equal to 5 !").max(50,"password length must be less then 50!")
  });

  const {register,formState:{errors},handleSubmit,reset} = useForm<LoginForm>({
    resolver:zodResolver(schema)
  });
  const onSubmit = async (data:LoginForm)=>{
    try{
      const response = await fetchUserData(data);
      localStorage.setItem('user',JSON.stringify(response));
      alert('login success');
    }catch(err){
      alert("invalid user creadencial please try again!");
    }
    reset();
  }
  return (
    <>
      {forgetPassword ?
        <form className='login-with-gosip-container' onSubmit={handleSubmit(onSubmit)}>
          <p>Sign in with Gosip Account</p>
          <input type="text" placeholder='Username' {...register('username',{required:'username is required '})}/>
          <p>{errors.username?.message}</p>
          <input type="password" placeholder='Password' {...register('password',{required:'password is required field '})} />
          <p>{errors.password?.message}</p>
          <button>Login</button>
          <div className="forget-and-toggle"> 
            <p className='have-account' onClick={() => toggleForm(pre => !pre)}>Create an account! <span>Register </span></p>
            <p><span onClick={()=>setForgetPassword(pre=>!pre)} className="forget-password"> forget Password</span></p>
          </div>
        </form> :
        <ForgetPasswordForm toggle={setForgetPassword}/>
      }
    </>
  )
}
export default LoginUserForm;
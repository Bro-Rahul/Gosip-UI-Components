import React,{useContext} from 'react'
import { authContext } from '../../store/authStore/AuthStore'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z,ZodType} from 'zod'
import { UserForm } from '../../schema';
import { fetchUserData } from '../../../http';

const schema:ZodType<UserForm> = z.object({
  username : z.string().min(3).max(70),
  password : z.string().min(3).max(100),
  email : z.string().email('please enter a valid email')
});

const CreateUserForm: React.FC = () => {
  const {login} = useContext(authContext);
  const {register,formState:{errors},handleSubmit} = useForm<UserForm>({
    resolver : zodResolver(schema)
  })
  const onSubmit = async (data:UserForm)=>{
    try{
      const response = await fetchUserData(data);
      login(response);
      localStorage.setItem('user',JSON.stringify(response))
      alert('login success ');
    }catch(err){
      console.log(err);
      alert("can not login the user ");
    }
  }
  return (
    <form className='login-with-gosip-container' onSubmit={handleSubmit(onSubmit)}>
      <p>Sign up with Gosip Account</p>
      <input type="text" {...register('username')} placeholder='Username' />
      <p>{errors.username?.message}</p>
      <input type="email" {...register('email')} placeholder='Email' />
      <p>{errors.email?.message}</p>
      <input type="password" {...register('password')} placeholder='Password' />
      <p>{errors.password?.message}</p>
      <button>Login</button>
    </form>
  )
}

export default CreateUserForm
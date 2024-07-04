import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import {z,ZodType} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { fetchUserData } from '../../../http';
import { authContext } from '../../store/storeProvider/CommentProvider';
import { useContext } from 'react';

type UserFormType = {
    username : string,
    password : string,
    cpassword : string,
    email : string,
}

const schema:ZodType<UserFormType> = z.object({
    username : z.string().max(30).min(3),
    password : z.string().min(3).max(30),
    cpassword : z.string(),
    email : z.string().email('Enter a Valid email ')
}).refine(data=>data.cpassword === data.password ,{
    message : "Password and Comfirm Password does not match !",
    path : ['cpassword']
});


const CreateUserForm = () => {

    const {login} = useContext(authContext);

    const {register,handleSubmit,reset,formState:{errors}} = useForm<UserFormType>({
        resolver : zodResolver(schema)
    })

    const onSubmitLogin = async (data:UserFormType)=>{
        try{
            const response = await fetchUserData(data)
            login(response)
            localStorage.setItem('user',JSON.stringify(response))
        }catch(error){
            alert(error)
            console.log(error)
        }
        reset()
    }
    return (
        <div className='createuser-form-container'>
            <div className='createuser-form-container-social-login'>
                <p> Login With</p>
                <div>
                    <button className='social-login-google'><FaGoogle /></button>
                    <button className='social-login-facebook'><FaFacebook /></button>
                    <button className='social-login-apple'><FaApple /></button>
                    <button className='social-login-instagram'><FaInstagram /></button>
                    <button className='social-login-twitter'><BsTwitterX /></button>
                </div>
            </div>
            <div className='createuser-form-container-login-with-gosip'>
                <p> Or sign up with Disqus</p>
                <div>
                    <form onSubmit={handleSubmit(onSubmitLogin)}>
                        <input type="text" placeholder='Name' {...register('username')} />
                        <p className='error '>{errors.username?.message}</p>
                        <input  type="email" placeholder='Email' {...register('email')} />
                        <p className='error'>{errors.email?.message}</p>
                        <input type="password" placeholder='Password' {...register('password')} />
                        <p className='error'>{errors.password?.message}</p>
                        <input type="password" placeholder='Comfirm Password' {...register('cpassword')} />
                        <p className='error'>{errors.cpassword?.message}</p>
                        <p>Please access our Privacy Policy to learn what personal data Disqus collects and your choices about how it is used. All users of our service are also subject to our Terms of Service</p>
                        <p className='checkbox-form'>
                            <input type="checkbox" name='guess' />
                            I'd rather post as a guest
                        </p>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUserForm
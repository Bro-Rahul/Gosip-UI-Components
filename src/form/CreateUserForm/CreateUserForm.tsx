import React, {useState } from 'react'
import { authContext } from '../../store/authStore/AuthStore'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodType } from 'zod'
import { createNewUser, sendOTP, validateOTP } from '../../../http';
import EmailVerifyForm from '../EmailVerifyForm';
import { UserForm, VerifyEmail } from '../../schema';


const schema: ZodType<UserForm> = z.object({
  username: z.string().min(3).max(70),
  email: z.string().email({message: 'Enter a valid email'}),
  password: z.string().min(3).max(100)
});

const CreateUserForm: React.FC<{ toggleForm: React.Dispatch<React.SetStateAction<boolean>> }> = ({ toggleForm }) => {

  const [verifyEmail, setVerifyEmail] = useState<boolean>(false);

  const [optResend, setOptResend] = useState<boolean>(false);
  const [OTP, setOTP] = useState<string>('');

  const { register, formState: { errors }, handleSubmit, getValues,reset } = useForm<UserForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: UserForm) => {
    try {
      await createNewUser(data);
      alert('User created success ');
    } catch (err) {
      console.log(err);
      alert("can not login the user ");
    }
    reset();
    setOTP(pre=>"");
  }

  async function handleOTPVarification(e: React.MouseEvent<HTMLButtonElement>) {
    const values = getValues();
    setOptResend(true);
    try{
      await validateOTP({code:OTP,email:values.email});
      setVerifyEmail(true);
    }catch(err){
      console.log(err);
      alert("Enter a Valid OTP");
    }
  }
  async function handleResendOTP(e: React.MouseEvent<HTMLButtonElement>) {
    const value = getValues();
    setOptResend(true);
    try{
      await sendOTP(value.email);
      alert("OTP sended successfully on your email ");
    }catch(err){
      console.log(err);
      alert("Can't resend the OTP ")
    }
  }
  return (
    <form className='login-with-gosip-container' onSubmit={handleSubmit(onSubmit)}>
      <p>Sign up with Gosip Account</p>
      <input type="text" placeholder='Username' {...register('username',{required:'username is required '})} />
      <p>{errors.username?.message}</p>
      <div className='email-verification'>
        <input type='email' placeholder='Enter Email' disabled={verifyEmail} {...register('email',{required:"Please enter an email"})}/>
        <div>
          {!verifyEmail && <input type="number" placeholder='Enter OTP' defaultValue={OTP} value={OTP} onChange={e => setOTP(pre => (e.target.value))} />}
          {!verifyEmail && <button type='button' onClick={handleResendOTP}>{optResend ? "Resend OTP" : "Send OTP"}</button>}
          {!verifyEmail && <button type='button' onClick={handleOTPVarification}>Verify OTP</button>}
        </div>
      </div>
      <p>{errors.email?.message} </p>
      <input type="password" placeholder='Password' {...register('password',{required:'password is required'})} />
      <p></p>
      <button disabled={!verifyEmail}>Create Account</button>
      <p className='have-account' onClick={() => toggleForm(pre => !pre)}>Already have account <span>Login</span></p>
    </form>
  )
}

export default CreateUserForm
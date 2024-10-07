import React, { useState } from 'react'
import { LoginForm } from '../../schema';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgetPasswordOTPSend,forgetPasswordOTPVerify,changePassword } from '../../../http';

const ForgetPasswordForm: React.FC<{ toggle: React.Dispatch<React.SetStateAction<boolean>> }> = ({ toggle }) => {
    const [verified, setverify] = useState<boolean>(false);
    const [OTP, setOTP] = useState<string>('');
    const [optResend, setOptResend] = useState<boolean>(false);

    const schema: ZodType<LoginForm> = z.object({
        username: z.string().min(3, 'username length should be grater then 3 ').max(150, 'username length should less the 150 letters'),
        password: z.string().min(3, 'password should greater then 3 ').max(150, 'password length should less then 150 ')
    });
    const { register, formState: { errors }, handleSubmit, getValues,reset } = useForm<LoginForm>({
        resolver: zodResolver(schema)
    })
    const onSubmit = async (data: LoginForm) => {
        try{
            const response = await changePassword(data,OTP);
            alert('password changed success !');
        }catch(err){
            alert("can't update password")
        }
        reset();
        setOTP(pre=>'');
    }

    async function handleResendOTP(e: React.MouseEvent<HTMLButtonElement>) {
        const value = getValues();
        setOptResend(true);
        try {
            const response = await forgetPasswordOTPSend(value.username);
            alert("OTP sended successfully on your email ");
        } catch (err) {
            alert("Can't resend the OTP ")
        }
    }
    async function handleOTPVarification() {
        const values = getValues();
        setOptResend(true);
        try {
            await forgetPasswordOTPVerify(values.username,OTP);
            setverify(true);
        } catch (err) {
            alert("Enter a Valid OTP");
        }
    }
    return (
        <form className="login-with-gosip-container" onSubmit={handleSubmit(onSubmit)}>
            <p>Update Your Password</p>
            <div className='email-verification'>
                <input type='text' placeholder="Enter Username" disabled={verified} {...register('username',{required:'username is required '})} />
                <div>
                    {!verified && <input type="number" placeholder='Enter OTP' defaultValue={OTP} value={OTP} onChange={e => setOTP(pre => (e.target.value))} />}
                    {!verified && <button type='button' onClick={handleResendOTP}>{optResend ? "Resend OTP" : "Send OTP"}</button>}
                    {!verified && <button type='button' onClick={handleOTPVarification}>Verify OTP</button>}
                </div>
            </div>
            <input type="text" placeholder="New Password" {...register('password',{required:'password is required '})} />
            <button disabled={!verified}>Change Password</button>
            <p className='have-account' onClick={() => toggle(pre => !pre)}>Back to <span>Login </span></p>
        </form>
    );
}
export default ForgetPasswordForm;
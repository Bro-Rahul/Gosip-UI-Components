import React, { useState } from 'react';
import { sendOTP, validateOTP } from '../../../http';
import {VerifyEmail} from "../../schema/index"


const EmailVerifyForm: React.FC<{inputType:string,inputValue:string,setinputValue:React.Dispatch<React.SetStateAction<string>>,verified:boolean,setverify:React.Dispatch<React.SetStateAction<boolean>>}> = ({inputType,inputValue,setinputValue,setverify,verified}) => {
  const [optResend, setOptResend] = useState<boolean>(false);
  const [OTP, setOTP] = useState<string>('');

  async function handleOTPVarification(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      const data:VerifyEmail = { 
        email : inputValue,
        code : OTP
      }
      const response = await validateOTP(data);
      setverify(true);
    } catch (err) {
      alert('Invalid OTP!');
      console.error(err)
    } finally {
      setOptResend(true);
    }
  }
  "mr.rahul.0619@gmail.com"
  async function handleResendOTP(e: React.MouseEvent<HTMLButtonElement>) {
    try {
      const response = await sendOTP(inputValue);
      alert('OTP sent successfully!');
    } catch (err) {
      throw new Error("Can't send the OTP");
    }
  }

  return (
    <div className='email-verification'>
      <input type={inputType} placeholder="Enter Email" disabled={verified} required defaultValue={inputValue} onChange={e => setinputValue(e.target.value)} />
      <div>
        {!verified && <input type="number" placeholder='Enter OTP' defaultValue={OTP} value={OTP} onChange={e=>setOTP(pre=>(e.target.value))}/>}
        {!verified && <button type='button' onClick={handleResendOTP}>{optResend ? "Resend OTP" : "Send OTP"}</button>}
        {!verified && <button type='button' onClick={handleOTPVarification}>Verify OTP</button>}
      </div>
    </div>
  )
}

export default EmailVerifyForm
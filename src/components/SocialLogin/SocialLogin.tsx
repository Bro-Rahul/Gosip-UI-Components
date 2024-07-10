import React from 'react'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

const SocialLogin:React.FC = () => {
    return (
        <div className='social-login-container'>
            <p>Login With</p>
            <div className='social-login-options'>
                <button><FaGoogle className='google-btn' /></button>
                <button><FaFacebook className='facebook-btn' /></button>
                <button><FaInstagram className='instagram-btn' /></button>
                <button><RiTwitterXLine className='twitter-btn' /></button>
            </div>
        </div>
    )
}

export default SocialLogin
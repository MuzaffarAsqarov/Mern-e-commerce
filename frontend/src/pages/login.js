import React, { useState } from 'react'
import loginPageImage from "../assest/fon.jpg"
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom'
import { z } from "zod"
import { LoginValidator } from '../libs/validator';
import axios from "axios"
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const navigate = useNavigate()
    const { login } = useAuth()
    

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})

    const handleChange = e =>{
        const { name, value } = e.target;
        setData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {      
        try {
            LoginValidator.parse(data);
            setErrors({})
            await axios.post('http://localhost:5000/api/login', data)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    if(res.data.message === 'success'){
                        console.log(res.data);                        
                        login(res.data.user)
                        toast.success("Login successfully!", {
                            position: "bottom-right",
                          });                       
                        navigate('/')
                    }                    
                }
            })
            .catch(function (error) {
                toast.error(error.response.data.error);               
            })

        } catch (error) {
            console.log('error')
            if(error instanceof z.ZodError){
                setErrors(
                    error.errors.reduce((acc, err) => {
                        return { ...acc, [err.path[0]]: err.message};
                    }, {})
                )
            }
        }
    }

    return (
        <div className=' w-full h-[calc(100vh-90px)] shadow-md  flex items-center justify-center'>
            <div className=' w-[1000px] h-[700px] border flex'>                
                <div className='w-1/2 h-full relative'>
                <div className='absolute top-[25%] px-10'>
                    <h1 className='text-2xl  font-extrabold  text-white'>Welcome our e-commerce. </h1>
                    <p className='text-xs text-white mt-2'>We are glad to see you on our platform</p>
                </div>
                    <img src={loginPageImage} alt='' className='w-full h-full object-cover ' />
                </div>

                <div className='w-1/2 h-full bg-white px-20 py-20 flex flex-col justify-between'>
                    <p>E-commerce</p>
                    <div className='flex flex-col gap-4'>
                        <div className='mb-2'>
                            <p className='text-2xl font-bold'>Login</p>
                            <p className='text-xs text-gray-400 mt-3'>Welcome our e-commerce. Please enter login!</p>
                        </div>

                        <div className='w-full'>
                            <input 
                                type='email' 
                                name='email'
                                value={data.email} 
                                placeholder='Email!' 
                                className='w-full outline-none p-2 border-b'
                                onChange={handleChange}
                                autoComplete='on'
                            />
                            {errors?.email && (
                                <span className='text-xs text-red-500' >{errors.email}</span>
                            )}
                        </div>
                        
                        <div className='w-full'>
                            <input 
                                type='password' 
                                name='password' 
                                value={data.password}  
                                placeholder='Password!' 
                                className='w-full outline-none p-2 border-b'
                                onChange={handleChange}
                            />
                            {errors?.password && (
                                <span className='text-xs text-red-500'>{errors.password}</span>
                            )}                            
                        </div>

                        <div className='flex items-center mt-3 justify-between'>
                            <div className='flex items-center'>
                                <input type='checkbox' id='rememberme' className='w-4 h-4 mr-2'/>
                                <label className='text-sm'>remember me</label>                                
                            </div>
                            <Link to={"/"} className='text-xs underline font-medium hover:text-red-500'>Forgot Password?</Link>
                        </div>

                        <button 
                            className='w-full p-2 mt-5 bg-red-500 text-white text-md rounded hover:bg-red-400'
                            onClick={handleSubmit}
                        >Sign in</button>

                        <div className='w-full flex items-center justify-center relative py-2'>
                            <div className='w-full h-[1px] bg-black/20 text-center  relative'></div>
                            <p className='absolute text-sm bg-white px-3'>or</p>
                        </div>

                        <button className='flex items-center justify-center w-full p-2 bg-white text-black text-md rounded border hover:bg-slate-50'><FcGoogle className='text-xl mr-2' /> Sign in with google</button>

                        
                    </div>

                    <div className='text-center text-sm whitespace-nowrap'>
                        <p>Don't have a account?  <Link to={"/register"} className='font-medium underline hover:text-red-500'>Sign Up</Link></p>
                        
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Login
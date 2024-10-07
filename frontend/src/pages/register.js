import { useState } from "react";
import loginPageImage from "../assest/fon.jpg"
import { FcGoogle } from "react-icons/fc";
import { FaUserPlus } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import { schema } from "../libs/validator";
import { z } from "zod";
import axios from 'axios'
import { toast } from 'react-toastify';
import { Alert } from "@mui/material";
import user from '../assest/user.png'
import { useAuth } from "../context/AuthContext";



const Register = () => {

    const navigate = useNavigate()

    const { login } = useAuth()

    const [loading, setLoading] = useState(false)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [profilImage, setProfilImage] = useState(null)

    const [errors, setErrors] = useState({})
    const [resError, setResError] = useState({})

    const handleChange = e => {
        const { name, value } = e.target;
        setData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        try {
            schema.parse(data); 
            setErrors({})
            setLoading(true)
            const { name, email, password } = data
            console.log(name, email, password)

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', profilImage);

            await axios.post('http://localhost:5000/api/register', formData)
                .then(res => {
                    console.log(res)
                    if (res.status === 201) {
                        login(res.data.token, res.data.user)
                        toast.success("User create successfully!", {
                            position: "bottom-right",
                          });
                        navigate('/')
                    }
                })
                .catch(function (error) {
                    console.log(error)
                    setResError(error.response.data)
                }).finally(() => {
                    setLoading(false)
                });



        } catch (error) {
            console.log("shetda")
            if (error instanceof z.ZodError) {
                setErrors(
                    error.errors.reduce((acc, err) => {
                        return { ...acc, [err.path[0]]: err.message };
                    }, {})
                )
            }
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilImage(file)
            console.log(profilImage)
        }

    }

    return (
        <div className=' w-full h-[calc(100vh-90px)] shadow-md  flex items-center justify-center'>
            <div className=' w-[1000px] h-[750px] border flex'>
                <div className='w-1/2 h-full relative'>
                    <div className='absolute top-[25%] px-10'>
                        <h1 className='text-2xl  font-extrabold  text-white'>Welcome our e-commerce. </h1>
                        <p className='text-xs text-white mt-2'>We are glad to see you on our platform</p>
                    </div>
                    <img src={loginPageImage} alt='image' className='w-full h-full object-cover object-right' />                    
                </div>

                <div className='w-1/2 h-full bg-white px-20 p-10 flex flex-col justify-between'>

                    {resError.error &&
                        <Alert severity="error">{resError.error}</Alert>
                    }
                    <div className="w-full flex items-center justify-center relative">
                        {profilImage ?
                            (<img className='w-[90px] h-[90px] object-cover rounded-full border' src={URL.createObjectURL(profilImage)} />) :
                            (<div className='flex items-center justify-center text-5xl w-[90px] h-[90px] rounded-full border p-4'>
                                <FaUserPlus />
                            </div> )} 
                            {/* (<img className='w-[90px] h-[90px] rounded-full border p-4' src={user} />)} */}

                        <input
                            type="file"
                            name="image"
                            className="absolute border w-[80px] h-[80px] opacity-0 cursor-pointer"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='mb-2'>
                            <p className='text-2xl font-bold'>Register</p>
                            <p className='text-xs text-gray-400 mt-3'>Welcome our e-commerce. Please enter login!</p>
                        </div>

                        <div className='w-full'>
                            <input
                                type='text'
                                name="name"
                                value={data.name}
                                placeholder='Name!'
                                className='w-full outline-none p-2 border-b'
                                onChange={handleChange}
                            />
                            {errors?.name && (
                                <span className='text-xs text-red-500' >{errors.name}</span>
                            )}
                        </div>

                        <div className='w-full'>
                            <input
                                type='email'
                                name="email"
                                value={data.email}
                                placeholder='Email!'
                                className='w-full outline-none p-2 border-b'
                                onChange={handleChange}
                            />
                            {errors?.email && (
                                <span className='text-xs text-red-500' >{errors.email}</span>
                            )}
                        </div>

                        <div className='w-full'>
                            <input
                                type='password'
                                name="password"
                                value={data.password}
                                placeholder='Password!'
                                className='w-full outline-none p-2 border-b'
                                onChange={handleChange}
                            />
                            {errors?.password && (
                                <span className='text-xs text-red-500' >{errors.password}</span>
                            )}
                        </div>

                        <div className='w-full'>
                            <input
                                type='password'
                                name="confirmPassword"
                                value={data.confirmPassword}
                                placeholder='Confirm password!'
                                className='w-full outline-none p-2 border-b'
                                onChange={handleChange}
                            />
                            {errors?.confirmPassword && (
                                <span className='text-xs text-red-500' >{errors.confirmPassword}</span>
                            )}
                        </div>

                        <div className='flex items-center mt-3 justify-between'>
                            <div className='flex items-center'>
                                <input type='checkbox' id='rememberme' className='w-4 h-4 mr-2' />
                                <label className='text-sm'>remember me</label>
                            </div>
                            <Link to={"/"} className='text-xs underline font-medium hover:text-red-500'>Forgot Password?</Link>
                        </div>

                        {loading ?
                            (
                                <button
                                    className='w-full p-2 mt-3  bg-red-400 text-white text-md rounded'
                                    disabled={true}
                                >
                                    loading...
                                </button>
                            ) :
                            (
                                <button
                                    className='w-full p-2 mt-3  bg-red-500 text-white text-md rounded hover:bg-red-400'
                                    onClick={handleSubmit}
                                    disabled={false}
                                >
                                    Sign up
                                </button>
                            )
                        }


                        <div className='w-full flex items-center justify-center relative my-3 py-2'>
                            <div className='w-full h-[1px] bg-black/20 text-center  relative'></div>
                            <p className='absolute text-sm bg-white px-3'>or</p>
                        </div>

                        <button
                            className='flex items-center justify-center w-full p-2 bg-white text-black text-md rounded border hover:bg-slate-50'>
                            <FcGoogle className='text-xl mr-2' /> Sign in with google
                        </button>


                    </div>

                    <div className='text-center text-sm whitespace-nowrap'>
                        <p>Do you have a account?  <Link to={"/login"} className='font-medium underline hover:text-red-500'>Sign In</Link></p>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default Register
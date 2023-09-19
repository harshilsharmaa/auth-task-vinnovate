import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { backend_url } from '../utils/constant';

const Auth = () => {

    const {user} = useSelector((store)=>store.user);

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = async(e)=>{
        e.preventDefault();

        const reqUrl = `${backend_url}/${isLogin?"login":"register"}`
        try{

            const {data} = await axios.post(reqUrl, {name, email, password}, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if(data.error) {}
            else dispatch(addUser(data.user));
        }
        catch(err){
            setError(err.response.data.error);
        }
    }

    const changeType = (e)=>{
        e.preventDefault();
        setIsLogin(!isLogin);
        setError(null)
    }

    useEffect(()=>{
        if(user) {
            navigate('/');
        }
    },[user])

  return (
    <div className='flex flex-col sm:flex-row h-screen w-full'>

            <div className=' p-3 m-auto bg-gray-200 flex flex-col justify-center rounded-md'>
                <form onSubmit={(e)=>{handleSubmit(e)}}className=' flex flex-col m-auto mt-2 '>
                    <h2 className='text-4xl font-bold'>{isLogin?"Sign In":"Register"}</h2>
                    <h4>{isLogin?"Sign in to your account":"Create New Account"}</h4>

                    <h4 className='text-red-600 text-center'>{error}</h4>
        
                    <div className='mt-3 p-5 w-96 flex flex-col bg-white rounded-xl'>
                    {
                        !isLogin && <>
                        <label className='text-gray-700 '>Name</label>
                        <input required value={name} onChange={(e)=>setName(e.target.value)} className='mt-1 bg-gray-100 px-3 py-2 w-80 rounded-lg m-auto'></input>
                        </>
                    }
                        <label className='text-gray-700 '>Email Address</label>
                        <input required value={email} onChange={(e)=>setEmail(e.target.value)} className='mt-1 bg-gray-100 px-3 py-2 w-80 rounded-lg m-auto'></input>

                        <label className='text-gray-700 mt-4'>Password</label>
                        <input required value={password} onChange={(e)=>setPassword(e.target.value)} type='password' className='mt-1 bg-gray-100 px-3 py-2 w-80 rounded-lg m-auto'></input>

                        <button type='submit' className='mt-4 bg-black text-white px-8 py-2 rounded-xl w-80 m-auto'>{isLogin?"Sign In":"Register"}</button>
                    </div>
                    <h4 className='text-gray-500 text-center text-base font-medium mt-4'>{isLogin?"Don't have an account?":"Already have an account?"} <button onClick={(e)=>changeType(e)} className='text-blue-800 cursor-pointer'>{isLogin?"Register here":"Login Here"}</button></h4>
                </form>
            </div>
        </div>
  )
}

export default Auth
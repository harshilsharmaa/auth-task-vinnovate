import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'
import { backend_url } from '../utils/constant'

const Profile = () => {

    const {user} = useSelector((store)=>store.user);
    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    },[user])

    const dispatch = useDispatch();

    const handleLogout = async()=>{
        const {data} = await axios.get(backend_url, {
            withCredentials: true
        })
        dispatch(removeUser());
    }

  return (
    <div className='flex justify-center items-center'>
        <div className='m-auto p-4 rounded-md border'>
            <h3 className='text-xl'>Name: {user?.name}</h3>
            <h3 className='text-xl'>Email: {user?.email}</h3>
            <button onClick={()=>handleLogout()} className='border border-red-600 text-red-600 rounded-md px-3 py-2'>Logout</button>
        </div>
    </div>
  )
}

export default Profile
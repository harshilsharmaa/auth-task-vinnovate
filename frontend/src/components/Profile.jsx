import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Profile = () => {

    const {user} = useSelector((store)=>store.user);
    console.log(user);

    const navigate = useNavigate();
    
    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    },[user])

  return (
    <div>
        <div className='m-auto p-4 rounded-md border'>
            <h3>Name: {user?.name}</h3>
            <h3>Email: {user?.email}</h3>
        </div>
    </div>
  )
}

export default Profile
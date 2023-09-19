import React from 'react'
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Profile from './Profile';
import Auth from './Auth'
import axios from 'axios'
import { backend_url } from '../utils/constant';


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <><Profile /></>
    },
    {
        path: "/login",
        element: <Auth />
    },
])

const Layout = () => {

    const dispatch = useDispatch();

    const getUserProfile = async()=>{
        try {

            const {data} = await axios.get(`${backend_url}/profile`, {
                withCredentials: true
            })

            dispatch(addUser(data.user));
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getUserProfile();
    }, [])

    return (
        <RouterProvider router={appRouter} />
    )
}

export default Layout
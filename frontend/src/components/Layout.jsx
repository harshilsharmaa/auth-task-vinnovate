import React from 'react'
import { useEffect } from "react";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Profile from './Profile';
import Auth from './Auth'


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
        const backend_url = 'https://4000-harshilshar-authtaskvin-pe3uohx9sg0.ws-us104.gitpod.io'
        try {
            const res = await fetch(`${backend_url}/api/profile`);
            const data = await res.json();
            if (data.error) {}
            else dispatch(addUser(data.user));
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
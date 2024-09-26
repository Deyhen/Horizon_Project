'use client'

import { useAppDispatch, useAppSelector } from "@/src/store/store"
import { Login } from "./Login/login.component"
import { MiniProfile } from "./MiniProfile/miniProfile.component"
import { useEffect } from "react"
import { checkAuth } from "@/src/store/auth"


export const RightBar = () => {

    const user = useAppSelector(state => state.user.data)
    const isTokenLoading = useAppSelector(state => state.auth.isTokenLoading)
    const isUserLoading = useAppSelector(state => state.user.isUserLoading)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(localStorage.getItem('accessToken') && !isTokenLoading && !isUserLoading){
             dispatch(checkAuth())
        }
    }, [])

    return(
        <div className="row-start-2 md:mt-40">
{       (!isTokenLoading && !isUserLoading) ?
               (!user.id ?
                <Login/>
                :
                <MiniProfile/>)
                :
                <h1>Loading</h1>
}
        </div>
    )
}
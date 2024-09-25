'use client'

import { checkAuth, login } from "@/src/store/auth"
import { useAppDispatch } from "@/src/store/store"
import { useEffect, useState } from "react"

export const Login = () => {
    const dispatch = useAppDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        if(localStorage.getItem('accessToken')){
            dispatch(checkAuth())
        }
    }, [])

    const handleLogin = () =>{
        dispatch(login({username: username, password: password}))
    }
    return (
        <div className="relative bg-white md:rounded-[2rem] rounded-b-3xl flex justify-center items-center mx-4 font-bold">
            <span className="absolute left-0 right-0 mx-auto px-2 py-1 bg-element md:rounded-[2rem] rounded-t-3xl md:w-2/3 w-full text-center text-white -top-5">Авторизація</span>
            <form className="md:py-6 md:px-8 flex flex-col justify-center items-center pt-12 md:w-full">
                <input className="bg-orange text-white rounded-lg my-2 w-full h-8 placeholder:text-white p-1 px-2" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="bg-orange text-white rounded-lg my-2 w-full h-8 placeholder:text-white p-1 px-2" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <span className="text-gray-300 underline text-sm mb-2 text-end w-full  cursor-pointer">Забули пароль?</span>
                <div className="flex justify-center items-center mb-4 w-full">
                    <button type="button" className="mx-4 my-2 bg-gray-300 p-2 rounded-[2rem] min-w-32">
                        Регістрація
                    </button>
                    <button type="button" className="mx-4 my-2 bg-gray-300 p-2 rounded-[2rem] min-w-32" onClick={handleLogin}>
                        Увійти
                    </button>
                </div>
            </form>
        </div>
    )
}
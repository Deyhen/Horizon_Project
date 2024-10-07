'use client'

import { useAppDispatch } from "@/src/store/store"
import { checkResetToken, login, resetPassword } from "@/src/store/user/actions"
import { User } from "@/src/store/user/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const ResetPassword = () => {
    const [loading, setLoading] = useState(true)
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('')
    const searchParams = useSearchParams()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const token = searchParams.get('token')

    useEffect(()=>{
        if(!token){
            router.push('/')
        }else{
            dispatch(checkResetToken(token)).unwrap()
            .then(() => setLoading(false))
            .catch(() => {
                Swal.fire({
                    title: 'Термін дії токена минув або він неправильний',
                    confirmButtonColor: '#e77f2a',
                    icon: 'error',
                    iconColor: "#e77f2a"
                }).then(() => router.push('/'));
            })
        }
    }, [])

    const handleSubmit = () =>{
        if(newPassword === newPasswordConfirmation && token){
            dispatch(resetPassword({token: token, password: newPassword})).unwrap()
            .then(() => {
                Swal.fire({
                    title: 'Новий пароль успішно встановлено',
                    confirmButtonColor: '#e77f2a',
                    icon: 'success',
                    iconColor: "#e77f2a"
                })
                .then(() => router.push('/'));
            })
            .catch((rejectedValueOrSerializedError)=>{
                Swal.fire({
                    title: rejectedValueOrSerializedError,
                    confirmButtonColor: '#e77f2a',
                    icon: 'error',
                    iconColor: "#e77f2a"
                });
            })
        }else{
            Swal.fire({
                title: 'Паролі не співпадають',
                confirmButtonColor: '#e77f2a',
                icon: 'error',
                iconColor: "#e77f2a"
            });
        } 
    }
    
    return(
        !loading ? 
        <div className="flex flex-col bg-white rounded-3xl p-6 justify-center items-center">
            <h1 className="text-element mx-2 mb-2 text-2xl">Відновлення паролю</h1>
            <div className="flex flex-col mt-4">
                <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Уведіть новий пароль" 
                className="text-element border-2 border-orange focus:outline-element m-2 p-1"/>
                <input type='password' value={newPasswordConfirmation} onChange={(e) => setNewPasswordConfirmation(e.target.value)} placeholder="Повторіть новий пароль" 
                className="text-element border-2 border-orange focus:outline-element m-2 p-1"/>
            </div>
            <button onClick={handleSubmit} className="mt-8 p-3 border-2 border-element hover:bg-element text-element hover:text-white rounded-xl ">Встановити новий пароль</button>
        </div>
        :
        <div>
            Loading...
        </div>
    )
    
}

export default ResetPassword
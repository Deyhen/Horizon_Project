'use client'

import { login } from "@/src/store/user/actions"
import { useAppDispatch, useAppSelector,  } from "@/src/store/store"
import { Form, Formik } from "formik"
import {object, string} from 'yup'
import { MyInput } from "../../Custom/input/myInput.component"
import Link from "next/link"
import Swal from "sweetalert2"

interface Values {
    username: string,
    password: string
  }



export const Login = () => {
    const dispatch = useAppDispatch()
    const inputClass = 'bg-orange text-white rounded-lg my-2 w-full h-8 placeholder:text-white p-1 px-2 focus:outline-1 outline-element'

    const loginError = useAppSelector(state => state.user.loginError)

    const LoginSchema = object().shape({
        username: string()
          .min(4, 'Username is too short!')
          .max(50, 'Username is too long!')
          .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'invalid symbols')
          .required(),
        password: string()
          .min(4, 'Password is too short!')
          .max(50, 'Password is too long!')
          .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'invalid symbols')
          .required(),
      });
    return ( 

            <div className="relative bg-white md:rounded-[2rem] rounded-b-3xl flex justify-center items-center mx-4 font-bold">
                <span className="absolute left-0 right-0 mx-auto px-2 py-1 bg-element md:rounded-[2rem] rounded-t-3xl md:w-2/3 w-full text-center text-white -top-5">Авторизація</span>
                <Formik
                    initialValues={{
                        username: '',
                        password:''
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={(
                    values: Values,
                    validationSchema

                    ) => {
                        dispatch(login({username: values.username, password: values.password})).unwrap()
                        .then(async (originalPromiseResult) => {
                        })
                        .catch((rejectedValueOrSerializedError) => {
                            Swal.fire({
                                title: rejectedValueOrSerializedError,
                                confirmButtonColor: '#e77f2a',
                                icon: 'error',
                                iconColor: "#e77f2a"
                            });
                        })
      
                    }}
                >
                    <Form className="md:py-6 md:px-8 flex flex-col justify-center items-center pt-12 md:w-full">
                        <MyInput inputStyle={inputClass} type="text" placeholder="username" name="username"/>
                        <MyInput inputStyle={inputClass} type="password" placeholder="password" name="password" label=""/>
                        <span className="text-gray-300 underline text-sm mb-2 text-end w-full  cursor-pointer">Забули пароль?</span>
                        <div className="flex justify-center items-center mb-4 w-full">
                            <Link href="/register"  className="mx-4 my-2 bg-gray-300 p-2 rounded-[2rem] min-w-32 text-center">
                                Регістрація
                            </Link>
                            <button type="submit" className="mx-4 my-2 bg-gray-300 p-2 rounded-[2rem] min-w-32">
                                Увійти
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
    )
    
}
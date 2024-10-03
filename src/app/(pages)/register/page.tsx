'use client'

import { MyInput } from "@/src/components/Custom/input/myInput.component"
import { signup } from "@/src/store/user/actions"
import { useAppDispatch, useAppSelector,  } from "@/src/store/store"
import { Form, Formik } from "formik"
import {object, string, ref} from 'yup'
import { useRouter } from "next/navigation"
import { useRef } from "react"
import Swal from "sweetalert2"

interface Values {
    username: string,
    password: string,
    email: string,
    confirmPassword: string
  }

const Registration = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const container = useRef(null)

    const user = useAppSelector(state => state.user.data)

    const inputClass = 'bg-orange text-white rounded-lg my-2 w-full h-8 placeholder:text-white p-1 px-2 focus:outline-1 outline-element'

    const onSubmit = ({username, password, email} : {username: string, password: string, email: string}) => {
        dispatch(signup({username: username, password: password, email: email})).unwrap()
        .then(async (originalPromiseResult) => {
            Swal.fire({
                title: 'Реєстрація успішна\nПідтвердіть ваш email, будь ласка.',
                text: 'Також ви це можеет зробити в будь який момент в особистому кабінеті',
                icon: 'success',
                iconColor: '#e77f2a',
                confirmButtonColor: '#e77f2a'
              }).then(() =>{
                router.push('/')
            });
        })
        .catch((rejectedValueOrSerializedError) => {
            Swal.fire({
                title: rejectedValueOrSerializedError,
                confirmButtonColor: '#e77f2a',
                icon: 'error',
                iconColor: "#e77f2a"
              });
        })
    }


    const RegistrationSchema = object().shape({
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
        email: string()
          .min(4, 'Email is too short!')
          .max(50, 'Email is too long!')
          .email()
          .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}@._-]+$/gu, 'invalid symbols')
          .required(),
        confirmPassword: string()
        .oneOf([ref('password'), ''], 'Пароли не совпадают')
        .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'invalid symbols')
        .required(),
      });

    return(
            <div className="relative bg-white md:rounded-[2rem] rounded-b-3xl flex justify-center items-center mx-4 font-bold" ref={container}>
                
                <span className="absolute left-0 right-0 mx-auto px-2 py-1 bg-element md:rounded-[2rem] rounded-t-3xl md:w-2/3 w-full text-center text-white -top-5">Реєстрація</span>
                {!user.id ?
                <Formik
                    initialValues={{
                        username: '',
                        password:'',
                        email: '',
                        confirmPassword: ''
                    }}
                    validationSchema={RegistrationSchema}
                    onSubmit={(
                    values: Values,
                    validationSchema
                    ) => {
                        onSubmit({username: values.username, email: values.email, password: values.password})
                    }}
                >
                    {({ errors, touched }) =>
                    (<Form className="md:py-6 md:px-8 flex flex-col justify-center items-center pt-12 md:w-full">
                        <MyInput inputStyle={inputClass} type="text" placeholder="username" name="username"/>
                        <MyInput inputStyle={inputClass} type="email" placeholder="email@email.com" name="email"/>
                        <MyInput inputStyle={inputClass} type="password" placeholder="password" name="password" label=""/>
                        <MyInput inputStyle={inputClass} type="password" placeholder="confirm password" name="confirmPassword" label=""/>

                        <div className="flex justify-center items-center mb-4 w-full">
                            <button type="submit" className="mx-4 my-2 bg-gray-300 p-2 rounded-[2rem] min-w-32">
                                Надіслати
                            </button>
                        </div>

                    </Form>)}
                </Formik>
                :
                <div className="flex justify-center items-center p-40 text-3xl">Ця сторінка недоступна зареєстрованим користувачам</div>
                }
            </div>
    )
}

export default Registration
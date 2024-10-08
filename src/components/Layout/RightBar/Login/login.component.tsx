'use client';

import { forgotPassword, login } from '@/src/store/user/actions';
import { useAppDispatch } from '@/src/store/store';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';

import Link from 'next/link';
import Swal from 'sweetalert2';
import styles from './styles.module.css';
import { MyInput } from '@/src/components/Custom/input/myInput.component';

interface Values {
  username: string;
  password: string;
}

export const Login = () => {
  const dispatch = useAppDispatch();
  const inputClass =
    'bg-orange text-white rounded-lg my-2 w-full h-8 placeholder:text-white p-1 px-2 focus:outline-1 outline-element';

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: 'Уведіть ваш email',
      input: 'email',
      inputPlaceholder: 'example@email.com',
      color: '#e77f2a',
      inputAutoFocus: true,
      confirmButtonColor: '#fbbd8b',
      customClass: {
        input: `${styles.emailInput}`,
      },
    });
    if (email) {
      dispatch(forgotPassword(email))
        .unwrap()
        .then(() => {
          Swal.fire({
            title: 'Лист відправлено вам на пошту',
            confirmButtonColor: '#e77f2a',
            icon: 'success',
            iconColor: '#e77f2a',
          });
        });
    }
  };

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
    <div className="relative mx-4 flex items-center justify-center rounded-b-3xl bg-white font-bold md:rounded-[2rem]">
      <span className="absolute -top-5 left-0 right-0 mx-auto w-full rounded-t-3xl bg-element px-2 py-1 text-center text-white md:w-2/3 md:rounded-[2rem]">
        Авторизація
      </span>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={LoginSchema}
        onSubmit={(values: Values) => {
          dispatch(login({ username: values.username, password: values.password }))
            .unwrap()
            .then(async () => {})
            .catch((rejectedValueOrSerializedError) => {
              console.log(rejectedValueOrSerializedError);
              Swal.fire({
                title: rejectedValueOrSerializedError,
                confirmButtonColor: '#e77f2a',
                icon: 'error',
                iconColor: '#e77f2a',
              });
            });
        }}
      >
        <Form className="flex flex-col items-center justify-center pt-12 md:w-full md:px-8 md:py-6">
          <MyInput inputStyle={inputClass} type="text" placeholder="username" name="username" />
          <MyInput
            inputStyle={inputClass}
            type="password"
            placeholder="password"
            name="password"
            label=""
          />
          <span
            className="mb-2 w-full cursor-pointer text-end text-sm text-gray-300 underline"
            onClick={handleForgotPassword}
          >
            Забули пароль?
          </span>
          <div className="mb-4 flex w-full items-center justify-center">
            <Link
              href="/register"
              className="mx-4 my-2 min-w-32 rounded-[2rem] bg-gray-300 p-2 text-center"
            >
              Регістрація
            </Link>
            <button type="submit" className="mx-4 my-2 min-w-32 rounded-[2rem] bg-gray-300 p-2">
              Увійти
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

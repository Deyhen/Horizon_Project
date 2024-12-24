import { RiMapPinUserLine, RiLock2Line } from 'react-icons/ri';
import { Button } from '@/src/shared/ui/Button/Button.component';
import { FiMail } from 'react-icons/fi';
import { ErrorMessage, Form, Formik } from 'formik';
import { object, string, ref } from 'yup';
import { Input } from '@/src/shared/ui/Input/Input.component';
import Swal from 'sweetalert2';
import { signup } from '@/src/store/user/actions';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { useRouter } from 'next/navigation';
import styles from './RegisterForm.module.css';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { Loader } from '@/src/shared/ui/Loader/loader.component';

const RegistrationSchema = object().shape({
  username: string()
    .min(4, 'Логін занадто короткий')
    .max(20, 'Логін занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required("Логін є обов'язковим полем"),
  password: string()
    .min(4, 'Пароль занадто короткий')
    .max(25, 'Пароль занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required("Пароль є обов'язковим полем"),
  email: string()
    .min(4, 'Email занадто короткий')
    .max(25, 'Email занадто довгий')
    .email()
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}@._-]+$/gu, 'Заборонені знаки!')
    .required("Email є обов'язковим полем"),
  confirmPassword: string()
    .oneOf([ref('password'), ''], 'Паролі не співпадають')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required("Підтвердження паролю є обов'язкоми"),
});

interface Values {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const rejectWith = useAppSelector((state) => state.user.signupError);
  const isPending = useAppSelector((state) => state.user.loading);

  const onSubmit = ({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) => {
    dispatch(signup({ username: username, password: password, email: email }))
      .unwrap()
      .then(() => router.push('/cabinet/profile'));
    // .then(async () => {
    //   Swal.fire({
    //     title: 'Реєстрація успішна\nПідтвердіть ваш email, будь ласка.',
    //     text: 'Також ви це можеет зробити в будь який момент в особистому кабінеті',
    //     icon: 'success',
    //     iconColor: '#e77f2a',
    //     confirmButtonColor: '#e77f2a',
    //   }).then(() => router.push('/cabinet/profile'));
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
      }}
      validationSchema={RegistrationSchema}
      onSubmit={(values: Values) => {
        onSubmit({
          username: values.username,
          email: values.email,
          password: values.password,
        });
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <Input
            maxLength={20}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            type="text"
            placeholder="Логін"
            name="username"
            errorStyle="hidden"
            icon={<RiMapPinUserLine className={styles.icon} />}
          />
          <Input
            maxLength={25}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            type="email"
            placeholder="email@email.com"
            name="email"
            errorStyle="hidden"
            icon={<FiMail className={styles.icon} />}
          />

          <Input
            maxLength={25}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            type="password"
            placeholder="Пароль"
            name="password"
            label=""
            errorStyle="hidden"
            icon={<RiLock2Line className={styles.icon} />}
          />
          <Input
            maxLength={25}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            type="password"
            placeholder="Повторіть пароль"
            name="confirmPassword"
            label=""
            errorStyle="hidden"
            icon={<RiLock2Line className={styles.icon} />}
          />
          <div className="pt-4">
            <Button type="submit" className="mt-4 rounded-2xl px-4 py-2">
              <span>Зареєструватись</span>
            </Button>
          </div>

          {
            Object.keys(errors).map((field) => {
              if (touched[field as keyof typeof touched]) {
                return (
                  <ErrorMessage key={field} name={field}>
                    {(msg) => (
                      <div className="text-lg font-semibold text-red-600 underline underline-offset-2">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                );
              }
              return null;
            })[0]
          }
          {rejectWith && (
            <span className="text-lg font-semibold text-red-600 underline">{rejectWith}</span>
          )}
          {isPending && <Loader />}
        </Form>
      )}
    </Formik>
  );
};

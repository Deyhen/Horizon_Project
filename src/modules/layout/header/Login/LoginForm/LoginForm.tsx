import Link from 'next/link';
import styles from './LoginForm.module.css';
import { object, string } from 'yup';
import { RiMapPinUserLine, RiLock2Line } from 'react-icons/ri';
import { Input, Button, Loader } from '@/src/shared/ui';
import { useAppDispatch, useAppSelector } from '@/src/store';
import { login } from '@/src/api';
import { ErrorMessage, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { Modal } from '@/src/modules/providers';
import { filterFormErrors } from '@/src/shared/utilities';

const LoginSchema = object().shape({
  username: string()
    .min(4, 'Логін ззанадто короткий')
    .max(20, 'Логін занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required("Логін є обов'язковим полем"),
  password: string()
    .min(4, 'Пароль занадто короткий')
    .max(25, 'Пароль занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required("Пароль є обов'язковим полем"),
});

interface Values {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const rejectWith = useAppSelector((state) => state.user.loginError);
  const isPending = useAppSelector((state) => state.user.loading);

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values: Values) => {
        dispatch(login({ username: values.username, password: values.password }))
          .unwrap()
          .then(() => {
            Modal.closeModal();
            router.push('/profile');
          });
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <Input
            maxLength={20}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            type="text"
            placeholder="Логін"
            name="username"
            icon={<RiMapPinUserLine className={styles.inputIcon} />}
          />
          <Input
            maxLength={25}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            type="password"
            placeholder="Пароль"
            name="password"
            icon={<RiLock2Line className={styles.inputIcon} />}
          />
          <div className="flex w-full justify-end">
            <span className="cursor-pointer text-sm text-text_secondary underline">
              Забули пароль?
            </span>
          </div>
          <div className="flex w-full items-center justify-center space-x-4 pt-4">
            <Button type="submit" className={styles.button}>
              <span>Увійти</span>
            </Button>
            <Link href="/register">
              <Button className={styles.button} onClick={Modal.closeModal}>
                <span>Реєстрація</span>
              </Button>
            </Link>
          </div>
          <div className="flex h-8 items-center justify-center">
            {isPending ? (
              <Loader />
            ) : rejectWith ? (
              <div className="text-sm font-medium text-red-600">{rejectWith}</div>
            ) : (
              filterFormErrors(errors, touched)
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

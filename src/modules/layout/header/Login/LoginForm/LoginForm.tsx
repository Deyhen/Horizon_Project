import { object, string } from 'yup';
import { RiMapPinUserLine, RiLock2Line } from 'react-icons/ri';
import { Input } from '@/src/shared/ui/Input/Input.component';
import { Button } from '@/src/shared/ui/Button/Button.component';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { login } from '@/src/store/user/actions';
import { ErrorMessage, Form, Formik } from 'formik';
import Link from 'next/link';
import styles from './LoginForm.module.css';
import { Loader } from '@/src/shared/ui/Loader/loader.component';
import { useRouter } from 'next/navigation';
import { Modal } from '@/src/modules/providers';

interface Values {
  username: string;
  password: string;
}

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
            router.push('/cabinet/profile');
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
            errorStyle="hidden"
            icon={<RiMapPinUserLine className={styles.inputIcon} />}
          />
          <Input
            maxLength={25}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            type="password"
            placeholder="Пароль"
            name="password"
            label=""
            errorStyle="hidden"
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
            {
              Object.keys(errors).map((field) => {
                if (touched[field as keyof typeof touched]) {
                  return (
                    <ErrorMessage key={field} name={field}>
                      {(msg) => (
                        <div className="text-lg font-semibold text-red-600 underline underline-offset-2 shadow-red-600 text-shadow">
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
          </div>
        </Form>
      )}
    </Formik>
  );
};

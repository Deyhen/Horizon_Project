import styles from './RegisterForm.module.css';
import { RiMapPinUserLine, RiLock2Line } from 'react-icons/ri';
import { Button, Loader, Input } from '@/src/shared/ui';
import { FiMail } from 'react-icons/fi';
import { ErrorMessage, Form, Formik, FormikErrors } from 'formik';
import { object, string, ref } from 'yup';
import { signup } from '@/src/api';
import { useAppDispatch, useAppSelector } from '@/src/store';
import { useRouter } from 'next/navigation';
import { Modal } from '../../providers';
import { filterFormErrors } from '@/src/shared/utilities';

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

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={RegistrationSchema}
      onSubmit={(values: Values) => {
        dispatch(
          signup({ username: values.username, password: values.password, email: values.email }),
        )
          .unwrap()
          .then(() => {
            router.push('/cabinet/profile');
            Modal.showModal({
              confirmButton: true,
              iconType: 'fullfilled',
              title: 'Посилання для підтвердження вашої електронної адреси надіслано на вашу пошту',
            });
          });
      }}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <Input
            maxLength={20}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            onFocus={() => console.log(errors, touched)}
            type="text"
            placeholder="Логін"
            name="username"
            icon={<RiMapPinUserLine className={styles.icon} />}
          />
          <Input
            maxLength={25}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            onFocus={() => console.log(errors, touched)}
            type="email"
            placeholder="email@email.com"
            name="email"
            icon={<FiMail className={styles.icon} />}
          />

          <Input
            maxLength={25}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            onFocus={() => console.log(errors, touched)}
            type="password"
            placeholder="Пароль"
            name="password"
            icon={<RiLock2Line className={styles.icon} />}
          />
          <Input
            maxLength={25}
            inputStyle={styles.input}
            containerStyle={styles.inputContainer}
            type="password"
            placeholder="Повторіть пароль"
            name="confirmPassword"
            icon={<RiLock2Line className={styles.icon} />}
          />
          <div className="pt-4">
            <Button type="submit" className="mt-4 rounded-2xl px-4 py-2">
              <span>Зареєструватись</span>
            </Button>
          </div>
          {isPending ? (
            <Loader />
          ) : rejectWith ? (
            <div className="text-lg font-medium text-red-600">{rejectWith}</div>
          ) : (
            filterFormErrors(errors, touched)
          )}
        </Form>
      )}
    </Formik>
  );
};

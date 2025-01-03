import { changePassword } from '@/src/api';
import { Button, Input, Loader } from '@/src/shared/ui';
import { useAppDispatch } from '@/src/store';
import { ErrorMessage, Form, Formik } from 'formik';
import { RiLock2Line } from 'react-icons/ri';
import { object, ref, string } from 'yup';
import { Modal } from '../../../providers';
import { useState } from 'react';

const ChangePasswordSchema = object().shape({
  currentPassword: string()
    .min(4, 'Дійсний пароль ззанадто короткий')
    .max(25, 'Дійсний пароль занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required("Дійсний пароль є обов'язковим полем"),
  newPassword: string()
    .min(4, 'Новий пароль занадто короткий')
    .max(25, 'Новий пароль занадто довгий')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required("Новий пароль є обов'язковим полем"),
  repeatNewPassword: string()
    .oneOf([ref('newPassword'), ''], 'Паролі не співпадають')
    .matches(/^[\p{L}\p{M}\p{Nd}\p{Pc}\p{Join_C}_-]+$/gu, 'Заборонені знаки!')
    .required("Підтвердження паролю є обов'язкоми"),
});

interface Values {
  currentPassword: string;
  newPassword: string;
}

export const ChangePasswordForm = () => {
  const dispatch = useAppDispatch();
  const [rejectWith, setRejectWith] = useState('');
  const [isPending, setIsPending] = useState(false);

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={(values: Values) => {
        setIsPending(true);
        dispatch(
          changePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          }),
        )
          .unwrap()
          .then(() => {
            setIsPending(false);
            Modal.showModal({
              iconType: 'fullfilled',
              title: 'Пароль успішно змінено',
              confirmButton: true,
            });
          })
          .catch((e) => {
            setIsPending(false);
            setRejectWith(e);
          });
      }}
    >
      {({ errors, touched }) => (
        <Form className="mt-6 flex w-full min-w-96 flex-col items-center justify-center space-y-8">
          <div className="flex flex-col space-y-4">
            <Input
              name="currentPassword"
              type="password"
              placeholder="Дійсний пароль"
              errorStyle="hidden"
              inputStyle="px-2 py-1 text-lg"
              icon={<RiLock2Line className="h-6 w-6" />}
            />
            <Input
              name="newPassword"
              type="password"
              placeholder="Новий пароль"
              errorStyle="hidden"
              inputStyle="px-2 py-1 text-lg"
              icon={<RiLock2Line className="h-6 w-6" />}
            />
            <Input
              name="repeatNewPassword"
              type="password"
              placeholder="Підтвердження паролю"
              errorStyle="hidden"
              inputStyle="px-2 py-1 text-lg"
              icon={<RiLock2Line className="h-6 w-6" />}
            />
          </div>
          <div className="flex flex-col items-center justify-center space-y-3">
            <Button type="submit">Змінити</Button>
            <div className="flex h-8 items-center justify-center">
              {isPending ? (
                <Loader />
              ) : rejectWith ? (
                <div className="text-lg font-semibold text-red-600 underline underline-offset-2 shadow-red-600 text-shadow">
                  {rejectWith}
                </div>
              ) : (
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
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

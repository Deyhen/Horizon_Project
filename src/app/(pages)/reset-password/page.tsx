'use client';

import { useAppDispatch } from '@/src/store/store';
import { checkResetToken, resetPassword } from '@/src/store/user/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/');
    } else {
      dispatch(checkResetToken(token))
        .unwrap()
        .then(() => setLoading(false))
        .catch(() => {
          Swal.fire({
            title: 'Термін дії токена минув або він неправильний',
            confirmButtonColor: '#e77f2a',
            icon: 'error',
            iconColor: '#e77f2a',
          }).then(() => router.push('/'));
        });
    }
  }, [dispatch, router, token]);

  const handleSubmit = () => {
    if (newPassword === newPasswordConfirmation && token) {
      dispatch(resetPassword({ token: token, password: newPassword }))
        .unwrap()
        .then(() => {
          Swal.fire({
            title: 'Новий пароль успішно встановлено',
            confirmButtonColor: '#e77f2a',
            icon: 'success',
            iconColor: '#e77f2a',
          }).then(() => router.push('/'));
        })
        .catch((rejectedValueOrSerializedError) => {
          Swal.fire({
            title: rejectedValueOrSerializedError,
            confirmButtonColor: '#e77f2a',
            icon: 'error',
            iconColor: '#e77f2a',
          });
        });
    } else {
      Swal.fire({
        title: 'Паролі не співпадають',
        confirmButtonColor: '#e77f2a',
        icon: 'error',
        iconColor: '#e77f2a',
      });
    }
  };

  return !loading ? (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-6">
      <h1 className="mx-2 mb-2 text-2xl text-element">Відновлення паролю</h1>
      <div className="mt-4 flex flex-col">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Уведіть новий пароль"
          className="m-2 border-2 border-orange p-1 text-element focus:outline-element"
        />
        <input
          type="password"
          value={newPasswordConfirmation}
          onChange={(e) => setNewPasswordConfirmation(e.target.value)}
          placeholder="Повторіть новий пароль"
          className="m-2 border-2 border-orange p-1 text-element focus:outline-element"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-8 rounded-xl border-2 border-element p-3 text-element hover:bg-element hover:text-white"
      >
        Встановити новий пароль
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ResetPassword;

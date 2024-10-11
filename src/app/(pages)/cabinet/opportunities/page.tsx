'use client';

import { AddNewPromocodes } from '@/src/components/AddNewPromocodes/addNewPromocodes.component';
import { MyInput } from '@/src/components/Custom/input/myInput.component';
import { MyButton } from '@/src/components/Custom/myButton/my-button.component';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { activateEmail, activatePromocode, changePassword, changeUsername } from '@/src/store/user/actions';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Opportunities = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);

  const [promocode, setPromocode] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');

  const handleActivateEmail = () => {
    dispatch(activateEmail())
      .unwrap()
      .then(() => {
        Swal.fire({
          title: 'Посилання активації відправлено вам на пошту',
          confirmButtonColor: '#e77f2a',
          icon: 'success',
          iconColor: '#e77f2a',
        });
      })
      .catch((rejectedValueOrSerializedError) => {
        Swal.fire({
          title: rejectedValueOrSerializedError,
          confirmButtonColor: '#e77f2a',
          icon: 'error',
          iconColor: '#e77f2a',
        });
      });
  };

  const handleSendPromocode = () => {
    dispatch(activatePromocode(promocode))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: 'Промокод успішно застосовано',
          confirmButtonColor: '#e77f2a',
          icon: 'success',
          iconColor: '#e77f2a',
        });
      })
      .catch((rejectedValueOrSerializedError) => {
        Swal.fire({
          title: rejectedValueOrSerializedError,
          confirmButtonColor: '#e77f2a',
          icon: 'error',
          iconColor: '#e77f2a',
        });
      });
    setPromocode('');
  };

  const handleSetNewUsername = () => {
    dispatch(changeUsername(newUsername))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: 'Логін успішно змінено',
          confirmButtonColor: '#e77f2a',
          icon: 'success',
          iconColor: '#e77f2a',
        });
      })
      .catch((rejectedValueOrSerializedError) => {
        Swal.fire({
          title: rejectedValueOrSerializedError,
          confirmButtonColor: '#e77f2a',
          icon: 'error',
          iconColor: '#e77f2a',
        });
      });
    setNewUsername('');
  };

  const handleSetNewPassword = () => {
    dispatch(changePassword({ newPassword: newPassword, currentPassword: currentPassword }))
      .unwrap()
      .then(() => {
        Swal.fire({
          title: 'Пароль успішно змінено',
          confirmButtonColor: '#e77f2a',
          icon: 'success',
          iconColor: '#e77f2a',
        });
      })
      .catch((rejectedValueOrSerializedError) => {
        Swal.fire({
          title: rejectedValueOrSerializedError,
          confirmButtonColor: '#e77f2a',
          icon: 'error',
          iconColor: '#e77f2a',
        });
      });
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="flex w-full">
      <div className='flex justify-center items-center w-full'>
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={(values: { name: string }) => {}}
      >
        <Form className="w-full max-w-lg bg-white p-6 rounded-xl shadow-md my-8">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">User Settings</h1>

          {/* Change Username */}
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-gray-600">Change Username</label>
            <div className="flex items-center">
              <MyInput
                name="username"
                containerStyle="h-10 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <MyButton onClick={handleSetNewUsername} className="ml-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md">
              <span>Done</span>
              </MyButton>
            </div>
          </div>

          {/* Change Password */}
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-gray-600">Change Password</label>
            <div className="flex items-center space-x-4">
              <MyInput
                name="current-password"
                containerStyle="h-10 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <MyInput
                name="new-password"
                containerStyle="h-10 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <MyButton onClick={handleSetNewPassword} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md">
                <span>Done</span>
              </MyButton>
            </div>
          </div>

          {/* Apply Promocode */}
          <div className="flex flex-col mb-4">
            <label className="mb-2 text-gray-600">Enter Promocode</label>
            <div className="flex items-center">
              <MyInput
                name="promocode"
                containerStyle="h-10 px-4 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
                type="text"
                value={promocode}
                onChange={(e) => setPromocode(e.target.value)}
              />
              <MyButton onClick={handleSendPromocode} className="ml-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md">
                <span>Apply</span>
              </MyButton>
            </div>
          </div>

          {!user.isActivated && (
            <MyButton onClick={handleActivateEmail} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md">
             <span> Activate Email</span>
            </MyButton>
          )}

          {user.role === 'admin' && (
            <div className="flex justify-between mt-6">
              <AddNewPromocodes />
              <Link href="/posts/new-post">
                <MyButton className="ml-4 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"><span>Add new post</span></MyButton>
              </Link>
            </div>
          )}
        </Form>
      </Formik>
      </div>
    </div>
  );
};

export default Opportunities;

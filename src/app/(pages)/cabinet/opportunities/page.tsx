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
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')

  const handleActivateEmail = () => {
    dispatch(activateEmail())
    .unwrap()
    .then(() => {
      Swal.fire({
        title: 'Посилання активації відправлено вам на пошту',
        confirmButtonColor: '#e77f2a',
        icon: 'success',
        iconColor: '#e77f2a',
      })
    })
    .catch((rejectedValueOrSerializedError) => {
      Swal.fire({
        title: rejectedValueOrSerializedError,
        confirmButtonColor: '#e77f2a',
        icon: 'error',
        iconColor: '#e77f2a',
      })
    })
  }
  const handleSendPromocode = () => {
    dispatch(activatePromocode(promocode))
    .unwrap()
    .then(() => {
      Swal.fire({
        title: 'Промокод успішно застосовано',
        confirmButtonColor: '#e77f2a',
        icon: 'success',
        iconColor: '#e77f2a',
      })
    })
    .catch((rejectedValueOrSerializedError) => {
      Swal.fire({
        title: rejectedValueOrSerializedError,
        confirmButtonColor: '#e77f2a',
        icon: 'error',
        iconColor: '#e77f2a',
      })
    })
    setPromocode('')
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
      })
    })
    .catch((rejectedValueOrSerializedError) => {
      Swal.fire({
        title: rejectedValueOrSerializedError,
        confirmButtonColor: '#e77f2a',
        icon: 'error',
        iconColor: '#e77f2a',
      })
    })
    setNewUsername('')
  }
  const handleSetNewPassword = () => {
    dispatch(changePassword({newPassword: newPassword, currentPassword: currentPassword}))
    .unwrap()
    .then(() => {
      Swal.fire({
        title: 'Пароль успішно змінено',
        confirmButtonColor: '#e77f2a',
        icon: 'success',
        iconColor: '#e77f2a',
      })
    })
    .catch((rejectedValueOrSerializedError) => {
      Swal.fire({
        title: rejectedValueOrSerializedError,
        confirmButtonColor: '#e77f2a',
        icon: 'error',
        iconColor: '#e77f2a',
      })
    })
    setCurrentPassword('')
    setNewPassword('')
  }
  return (
    <div className='flex justify-start items-start p-4'>
      <Formik 
        initialValues={{
          name:''
        }}
        onSubmit={(values: {name: string}) => {
          
        }}
        >
        <Form className='flex flex-col justify-start items-start'>
          <div className='flex justify-center items-center my-2'>
            <label className='text-center min-w-fit'>Змінити логін</label>
            <MyInput name='123333' containerStyle='h-8 mx-2 max-w-60' type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
            <MyButton onClick={handleSetNewUsername} className='rounded-xl ml-8'><span>Готово</span></MyButton>
          </div>
          <div className='flex justify-center items-center my-2'>
            <label className='text-center min-w-fit'>Змінити пароль</label>
            <MyInput name='12333' containerStyle='h-8 mx-2 max-w-60' type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
            <MyInput name='1233' containerStyle='h-8 mx-2 max-w-60' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
            <MyButton className='rounded-xl ml-8' onClick={handleSetNewPassword}><span>Готово</span></MyButton>
          </div>
          {!user.isActivated && <MyButton onClick={handleActivateEmail} className='my-2 rounded-xl ml-8' ><span>Активувати почту</span></MyButton>}
          <div className='flex  justify-center items-center my-2'>
            <label className='text-center min-w-fit text'>Увести промокод</label>
            <MyInput name='123' containerStyle='h-8 mx-2 max-w-60' type="text" value={promocode} onChange={(e) => setPromocode(e.target.value)} />
            <MyButton className='rounded-xl ml-8' onClick={handleSendPromocode}><span>Готово</span></MyButton>
          </div>
          {user.role === 'admin' &&
            <div className='flex'>
              <AddNewPromocodes/>
              <Link href={'/posts/new-post'} className='ml-8'><MyButton className='rounded-xl ml-8'><span>Додати новий пост</span></MyButton></Link>
            </div>
            }
        </Form>
      </Formik>
      
    </div>
  );
};

export default Opportunities;

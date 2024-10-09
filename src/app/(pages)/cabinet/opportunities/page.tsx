'use client';

import { AddNewPromocodes } from '@/src/components/AddNewPromocodes/addNewPromocodes.component';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { activateEmail, activatePromocode, changePassword, changeUsername } from '@/src/store/user/actions';
import { useState } from 'react';

const Opportunities = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);

  const [promocode, setPromocode] = useState('');
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')

  const handleActivateEmail = () => {
    dispatch(activateEmail());
  }
  const handleSendPromocode = () => {
    dispatch(activatePromocode(promocode));
  };
  const handleSetNewUsername =() => {
    dispatch(changeUsername(newUsername))
  }
  const handleSetNewPassword = () => {
    dispatch(changePassword({newPassword: newPassword, currentPassword: currentPassword}))
  }
  return (
    <div>
      <div>
        Change username
        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
        <button onClick={handleSetNewUsername}>send</button>
      </div>
      <div>
        Change pasword
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
        <button onClick={handleSetNewPassword}>send</button>
      </div>
      {!user.isActivated && <button onClick={handleActivateEmail}>Activate email</button>}
      <div>
        <label>Enter promo</label>
        <input type="text" value={promocode} onChange={(e) => setPromocode(e.target.value)} />
        <button onClick={handleSendPromocode}>Send</button>
      </div>
      {user.role === 'admin' &&
        <AddNewPromocodes/>
      }
    </div>
  );
};

export default Opportunities;

'use client';

import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { activateEmail, activatePromocode } from '@/src/store/user/actions';
import { useState } from 'react';

const Opportunities = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);

  const [promocode, setPromocode] = useState('');

  const handleActivateEmail = () => {
    console.log(localStorage.getItem('accessToken'));
    dispatch(activateEmail());
    console.log(1);
  };
  const handleSendPromocode = () => {
    dispatch(activatePromocode(promocode));
  };
  return (
    <div>
      <div>
        Change username
        <input type="text" />
      </div>
      <div>
        Change pasword
        <input type="text" />
      </div>
      {!user.isActivated && <button onClick={handleActivateEmail}>Activate email</button>}
      <div>
        <label>Enter promo</label>
        <input type="text" value={promocode} onChange={(e) => setPromocode(e.target.value)} />
        <button onClick={handleSendPromocode}>Send</button>
      </div>
    </div>
  );
};

export default Opportunities;

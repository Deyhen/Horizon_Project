'use client';

import { RiUserLine } from 'react-icons/ri';
import { IoDiamondOutline } from 'react-icons/io5';
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { LiaCoinsSolid } from 'react-icons/lia';
import { FaSackDollar } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { logout } from '@/src/store/user/actions';
import Link from 'next/link';

export const MiniProfile = () => {
  const line = 'flex my-0.5 text-gray-700';
  const lineImg = 'w-6 h-6 mr-1';

  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="relative mx-4 flex items-center justify-center rounded-b-3xl bg-white px-4 font-bold md:rounded-[2rem] md:px-16">
      <span className="absolute -top-5 left-0 right-0 mx-auto w-full rounded-t-3xl bg-element px-2 py-1 text-center text-white md:w-2/3 md:rounded-[2rem]">
        Профіль
      </span>
      <div className="flex w-full flex-col items-start justify-center py-6">
        <span className="w-full text-center text-xl text-orange">
          {user.username.toUpperCase()}
        </span>
        <div className="flex w-full md:flex-col md:items-center md:justify-center">
          <div className="text- my-2 flex w-full items-center justify-start md:justify-center">
            <div className="h-24 w-24 bg-gray-300">50x50</div>
          </div>
          <div className="mb-2 flex w-full items-center justify-between text-center">
            <div className="mx-2 flex flex-col">
              <div className="flex items-center justify-center text-xl">
                <LiaCoinsSolid className="mr-1 h-10 w-10" color="#fbbd8b" />
                <span>100</span>
              </div>
              <span className="text-sm text-gray-500">Гривені</span>
            </div>
            <div className="mx-2 flex flex-col">
              <div className="flex items-center justify-center text-center text-xl">
                <FaSackDollar className="mr-1 h-10 w-10" color="#fbbd8b" />
                <span>2000</span>
              </div>
              <span className="text-sm text-gray-500">Карбованці</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row text-xs md:flex-col md:text-xl">
          <Link href={`/cabinet`}>
            <div className={line}>
              <RiUserLine className={lineImg} color="#fbbd8b" /> Особистий кабінет
            </div>
          </Link>
          <Link href={`/cabinet/payment`}>
            <div className={line}>
              <IoDiamondOutline className={lineImg} color="#fbbd8b" /> Поповнення балансу
            </div>
          </Link>
          <div className={line}>
            <BsCurrencyDollar className={lineImg} color="#fbbd8b" /> Магазин переваг
          </div>
          <div className={line}>
            <MdOutlineShoppingCart className={lineImg} color="#fbbd8b" /> Магазин ресурсів
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            className="mt-4 rounded-3xl bg-orange px-8 py-2 text-xl text-white"
            onClick={handleLogout}
          >
            Вихід
          </button>
        </div>
      </div>
    </div>
  );
};

'use client';

import MinecraftSkinViewer from '@/src/modules/skinViewer/skin-viewer.component';
import Divider from '@/src/shared/ui/Divider/Divider';
import { Button } from '@/src/shared/ui/Button/Button.component';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { IoDiamondOutline } from 'react-icons/io5';
import { BsCurrencyDollar } from 'react-icons/bs';
import { logout } from '@/src/store/user/actions';

const Profile = () => {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex h-full min-h-[75vh] w-full items-center pl-40 pt-20">
      <Divider orientation="vertical" className="mr-32 bg-primary" />
      <div className="flex flex-col space-y-8">
        <MinecraftSkinViewer user={user} />
        <Button>
          <span>Загрузити скін</span>
        </Button>
        <Button>
          <span>Загрузити накидку</span>
        </Button>
      </div>
      <Divider orientation="vertical" className="mx-32 bg-primary" />
      <div className="ml-32 flex h-full flex-col items-center justify-start">
        <span className="my-4 text-3xl font-bold text-primary">{user.username}</span>
        <div className="flex items-center justify-center rounded-3xl border border-secondary px-3 py-0.5">
          <span className="">{user.role}</span>
        </div>
        <div className="mt-20 flex space-x-8">
          <div className="jusify-center flex items-center space-x-4 rounded-xl border-4 border-primary px-4 py-2">
            <IoDiamondOutline color="#F1861C" className="h-8 w-8" />
            <span className="text-xl font-semibold text-primary">{user.donateCurrency}</span>
          </div>
          <div className="jusify-center flex items-center space-x-4 rounded-xl border-4 border-primary px-4 py-2">
            <span className="text-xl font-semibold text-primary">{user.gameCurrency}</span>
            <BsCurrencyDollar color="#F1861C" className="h-8 w-8" />
          </div>
        </div>
        <Button onClick={handleLogout}>
          <span>logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Profile;

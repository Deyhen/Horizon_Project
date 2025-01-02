'use client';

import MinecraftSkinViewer from '@/src/modules/cabinet/skinViewer/skin-viewer.component';
import { Button } from '@/src/shared/ui/Button/Button.component';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import { CredentialsBlock } from '@/src/modules/cabinet/credentialsBlock';
import { BalanceBlock } from '@/src/modules/cabinet/BalanceBlock';

const Profile = () => {
  const user = useAppSelector((state) => state.user.data);

  return (
    <div className="flex h-full max-h-[75vh] w-full items-center space-x-52 pl-40 pt-12">
      <MinecraftSkinViewer user={user} />
      <div className="flex h-full w-1/2 flex-col items-center justify-between">
        <div className="flex w-full flex-col space-y-12">
          <CredentialsBlock user={user} />
          <BalanceBlock user={user} />
        </div>
        <div className="flex space-x-20">
          <Button>
            <span>Активувати промокод</span>
          </Button>
          <Button>
            <span>Активувати пошту</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

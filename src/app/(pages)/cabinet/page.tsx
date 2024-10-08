'use client';

import MinecraftSkinViewer from '@/src/components/skinViewer/skin-viewer.component';
import { useAppDispatch, useAppSelector } from '@/src/store/store';
import defaultAvatar from '@/public/images/default-avatar.png';
import Image from 'next/image';
import { changeAvatar, changeCape, changeSkin } from '@/src/store/user/actions';
import Swal from 'sweetalert2';

const Cabinet = () => {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  const avatar = process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + user.avatarPath;

  const handleSkinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const formData = new FormData();

    if (file) {
      formData.append('skin', file as string | Blob);
      formData.append('id', user.id);
      dispatch(changeSkin(formData)).then(() => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          iconColor: '#e77f2a',
          confirmButtonColor: '#e77f2a',
        });
      });
    }
  };
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const formData = new FormData();

    if (file) {
      formData.append('avatar', file as string | Blob);
      formData.append('id', user.id);
      dispatch(changeAvatar(formData)).then(() => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          iconColor: '#e77f2a',
          confirmButtonColor: '#e77f2a',
        });
      });
    }
  };
  const handleCapeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const formData = new FormData();

    if (file) {
      formData.append('cape', file as string | Blob);
      formData.append('id', user.id);
      dispatch(changeCape(formData)).then(() => {
        Swal.fire({
          title: 'Success',
          icon: 'success',
          iconColor: '#e77f2a',
          confirmButtonColor: '#e77f2a',
        });
      });
    }
  };
  return (
    <div className="relative flex p-4">
      <MinecraftSkinViewer user={user} />
      <div className="flex flex-col">
        <div className="flex">
          <label
            htmlFor="avatarInput"
            className="mr-4 flex cursor-pointer items-center justify-center"
          >
            <Image
              src={user.avatarPath ? avatar : defaultAvatar}
              className="h-32 w-32 border-2 border-black"
              width={400}
              height={400}
              alt=""
            />
          </label>
          <input
            type="file"
            id="avatarInput"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <div className="flex flex-col items-start justify-start">
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <div className="rounded-xl border-2 border-black px-2">{user.role}</div>
          </div>
        </div>
        <div className="ml-32 flex">
          <div className="mx-2">Donate currency: {user.donateCurrency}</div>
          <div className="mx-2">Game currency: {user.gameCurrency}</div>
        </div>
        <div className="mt-80 flex justify-between">
          <div>
            <label htmlFor="skinInput" className="cursor-pointer rounded border px-4 py-2">
              UPLOAD SKIN
            </label>
            <input
              type="file"
              accept="image/*"
              id="skinInput"
              onChange={handleSkinChange}
              className="hidden"
            />
          </div>
          <div>
            <label htmlFor="capeInput" className="cursor-pointer rounded border px-4 py-2">
              UPLOAD CLOAK
            </label>
            <input
              type="file"
              id="capeInput"
              accept="image/*"
              onChange={handleCapeChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cabinet;

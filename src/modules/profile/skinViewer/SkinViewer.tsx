import { useEffect, useRef, useState } from 'react';
import * as skinview3d from 'skinview3d';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';

import defaultSkin from '@/public/images/default-skin.png';
import { User } from '@/src/store/user/types';
import { Button } from '@/src/shared/ui/Button/Button.component';
import { GiCape } from 'react-icons/gi';
import clsx from 'clsx';
import { useAppDispatch } from '@/src/store';
import { changeCape, changeSkin } from '@/src/api';
import { Modal } from '../../providers';

export const MinecraftSkinViewer = ({ user }: { user: User }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationPaused, setAnimationPaused] = useState(true);
  const [hideCape, setHideCape] = useState(false);
  const dispatch = useAppDispatch();

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>, target: string) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.src = objectUrl;

    img.onload = () => {
      const formData = new FormData();
      const updatedFile = new File([file], `${user.username}.png`);
      formData.append(target, updatedFile);

      // to do modals response
      const targetChange = new Promise((resolve, reject) => {
        if (target === 'skin' && img.width === 64 && img.height === 64) {
          resolve(dispatch(changeSkin(formData)));
        } else if (target === 'cape' && img.width === 64 && img.height === 32) {
          resolve(dispatch(changeCape(formData)));
        } else {
          reject({ payload: 'Щось пішло не так,\n можливо вибраний неправильний формат файлу' });
        }
      });

      targetChange.then(() =>
        Modal.showModal({
          title: `${target === 'skin' ? 'Скін' : 'Накидку'} успішно змінено`,
          iconType: 'fullfilled',
          confirmButton: true,
        }),
      );
      targetChange.catch((value) =>
        Modal.showModal({ title: value.payload, iconType: 'reject', confirmButton: true }),
      );

      URL.revokeObjectURL(objectUrl);
    };
  };

  useEffect(() => {
    const skinPath = user.skinPath
      ? process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + user.skinPath
      : defaultSkin.src;
    const capePath =
      user.capePath && !hideCape
        ? process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + user.capePath
        : undefined;

    if (canvasRef.current) {
      const viewer = new skinview3d.SkinViewer({
        canvas: canvasRef.current,
        width: 300,
        height: 500,
        skin: skinPath,
        cape: capePath,
      });

      viewer.controls.enableZoom = true;

      animationPaused
        ? (viewer.animation = new skinview3d.IdleAnimation())
        : (viewer.animation = new skinview3d.WalkingAnimation());

      return () => {
        viewer.dispose();
      };
    }
  }, [user.skinPath, hideCape, animationPaused, user.capePath]);

  return (
    <div className="relative flex h-full flex-col justify-end space-y-8 rounded-3xl border border-text_secondary bg-black bg-opacity-40 px-20 pb-12">
      {animationPaused ? (
        <BsFillPlayFill
          onClick={() => setAnimationPaused((prev) => !prev)}
          size={30}
          className="absolute right-12 top-12 text-secondary"
        />
      ) : (
        <BsFillPauseFill
          onClick={() => setAnimationPaused((prev) => !prev)}
          size={30}
          className="absolute right-12 top-12 text-secondary"
        />
      )}

      <GiCape
        size={30}
        onClick={() => setHideCape((prev) => !prev)}
        className={clsx('absolute left-12 top-12 !m-0', {
          'text-secondary': !hideCape,
          'text-text': hideCape,
          hidden: !user.capePath,
        })}
      />
      <div className="relative flex w-80 flex-col items-center justify-center">
        <canvas className="h-full w-full" ref={canvasRef} />
      </div>
      <Button className="flex !px-0 !py-0">
        <label htmlFor="skinInput" className="h-full w-full cursor-pointer py-2">
          Загрузити скін
        </label>
        <input
          type="file"
          value={''}
          accept="image/png"
          id="skinInput"
          onChange={(e) => handleTargetChange(e, 'skin')}
          className="hidden"
        />
      </Button>
      <Button className="flex !px-0 !py-0">
        <label htmlFor="capeInput" className="h-full w-full cursor-pointer py-2">
          Загрузити накидку
        </label>
        <input
          type="file"
          value={''}
          id="capeInput"
          accept="image/png"
          onChange={(e) => handleTargetChange(e, 'cape')}
          className="hidden"
        />
      </Button>
    </div>
  );
};

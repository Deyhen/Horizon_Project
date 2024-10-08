import { useEffect, useRef, useState } from 'react';
import * as skinview3d from 'skinview3d';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import Dropdown from '../Custom/dropdown/dropdown.component';
import defaultSkin from '@/public/images/default-skin.png';
import { User } from '@/src/store/user/types';

const MinecraftSkinViewer = ({ user }: { user: User }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animation, setAnimation] = useState('Спокій'); // standing | walking | running | flying
  const [animationPaused, setAnimationPaused] = useState(false);
  const [hideCape, setHideCape] = useState(false);

  useEffect(() => {
    const skinPath = user.skinPath
      ? process.env.NEXT_PUBLIC_BACKEND_STATIC_URL + user.skinPath
      : defaultSkin;
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

      switch (animation) {
        case 'Спокій':
          viewer.animation = new skinview3d.IdleAnimation();
          break;
        case 'Політ':
          viewer.animation = new skinview3d.FlyingAnimation();
          break;
        case 'Ходьба':
          viewer.animation = new skinview3d.WalkingAnimation();
          break;
        case 'Біг':
          viewer.animation = new skinview3d.RunningAnimation();
          break;
        default:
          viewer.animation = new skinview3d.IdleAnimation(); // Default fallback
      }

      if (viewer.animation) {
        viewer.animation.paused = animationPaused;
      }

      return () => {
        viewer.dispose();
      };
    }
  }, [user.skinPath, animation, hideCape, animationPaused, user.capePath]);

  return (
    <div className="relative mr-8 flex w-80 flex-col border-2 border-black">
      <canvas className="h-full w-full" ref={canvasRef} />

      <button
        onClick={() => setAnimationPaused(!animationPaused)}
        className="absolute right-2 top-2"
      >
        {animationPaused ? <BsFillPlayFill size={30} /> : <BsFillPauseFill size={30} />}
      </button>

      <div className="absolute bottom-0 flex w-full items-center justify-between">
        <Dropdown
          label={`${animation}`}
          options={['Політ', 'Ходьба', 'Біг', 'Спокій']}
          onSelect={(animation) => setAnimation(animation)}
        />
        <button
          onClick={() => setHideCape(!hideCape)}
          className="inline-flex justify-center rounded-md bg-element px-3 py-1 font-semibold text-white focus:outline-none"
        >
          Накидка {hideCape ? 'вимк' : 'вімк'}
        </button>
      </div>
    </div>
  );
};

export default MinecraftSkinViewer;

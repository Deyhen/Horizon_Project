'use client';

import ServerInfo from '@/src/components/PagesBlocks/serverBlock.component';
import { getGameServers } from '@/src/store/servers/actions';
import { useAppDispatch } from '@/src/store/store';
import { useEffect } from 'react';

const ServersPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGameServers());
  });

  return (
    <div className="flex ">
<ServerInfo
        title="Сервер ANIGMA"
        subtitle="TechnoMagic"
        gameVersion="1.12.1"
        mainWorldSize="10000 x 10000"
        netherSize="5000 x 5000"
        endWorldSize="20000 x 20000"
        pvpStatus="Увімкнено"
        description="Amet ex sunt aliqua cillum aliqua aliquip sint qui adipisicing reprehenderit proident sit commodo qui. Magna veniam aute anim ea non eu tempor non quis ut do dolor duis excepteur. Adipisicing mollit sunt duis tempor labore. Adipisicing enim laborum laboris excepteur Lorem sit id et consequat pariatur. Ad enim mollit dolore adipisicing velit cillum voluptate. Exercitation id in incididunt eiusmod sit minim id aute ipsum in. Aute et eiusmod eiusmod tempor reprehenderit in sunt commodo."
        imageSrc="/path-to-your-image.jpg"  // Replace this with the correct path
      />
    </div>
  );
};


export default ServersPage;

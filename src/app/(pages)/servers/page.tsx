'use client';

import { ServerBlock } from '@/src/components/PagesBlocks/serverBlock.component';
import { getGameServers } from '@/src/store/servers/actions';
import { useAppDispatch } from '@/src/store/store';
import { useEffect } from 'react';

const ServersPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGameServers());
  });

  return (
    <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-8">
      {/* {gameServersData[0] ? 
                <div className="flex flex-col justify-center items-center">
                    {gameServersData.map((server) => 
                        <ServerBlock server={server}}/>
                )}
                </div>
                :
                <div> Game servers list is empty</div>
            } */}
      <ServerBlock server={{ title: 'Anigma', type: 'TechnoMagic', ip: '', playersNow: 12 }} />
      <ServerBlock server={{ title: 'Alpha', type: 'Techno', ip: '', playersNow: 87 }} />
      <ServerBlock server={{ title: 'Beta', type: 'Magic', ip: '', playersNow: 23 }} />
      <ServerBlock server={{ title: 'Gamma', type: 'Classic', ip: '', playersNow: 8 }} />
    </div>
  );
};

export default ServersPage;

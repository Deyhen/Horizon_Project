import { GameServer } from '@/src/store/servers/types';
import Link from 'next/link';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ServerBlockProps {
  server: GameServer;
}

export const ServerBlock = ({ server }: ServerBlockProps) => {
  return (
    <div className="relative mb-12 flex min-h-40 flex-col items-center justify-center rounded-b-3xl bg-white p-6 shadow-2xl shadow-element md:min-w-[30rem] md:flex-row md:rounded-[4rem] md:shadow-none">
      <h1
        className={
          'absolute -top-8 left-0 right-0 mx-auto w-full bg-[#e77f2a] md:-top-5 md:w-1/3 md:min-w-fit ' +
          'rounded-t-3xl px-4 py-1.5 text-center text-sm text-white md:rounded-3xl md:text-xl'
        }
      >
        {server.title}
      </h1>
      <div className="absolute left-5 h-24 w-24 md:h-32 md:w-32">
        <CircularProgressbarWithChildren
          value={server.playersNow}
          text={`${server.playersNow}`}
          strokeWidth={8}
          maxValue={100}
          styles={buildStyles({
            rotation: 1,
            textColor: '#e77f2a',
            pathColor: `#e77f2a`,
            trailColor: '#fbbd8b',
          })}
        />
      </div>
      <span className="md:items-center">{server.type}</span>
      <Link
        href={`/servers/${server.title}`}
        className={
          'absolute -bottom-5 -right-2 rounded-3xl bg-[#e77f2a] p-4 text-lg text-white md:text-xl'
        }
      >
        Детальніше
      </Link>
    </div>
  );
};

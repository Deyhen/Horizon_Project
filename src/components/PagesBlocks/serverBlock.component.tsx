import React from 'react';
import defaultImg from '@/public/images/defaultPostsImg.png';

interface ServerInfoProps {
  title: string;
  subtitle: string;
  gameVersion: string;
  mainWorldSize: string;
  netherSize: string;
  endWorldSize: string;
  pvpStatus: string;
  description: string;
  imageSrc: string;
}

const ServerInfo: React.FC<ServerInfoProps> = ({
  title,
  subtitle,
  gameVersion,
  mainWorldSize,
  netherSize,
  endWorldSize,
  pvpStatus,
  description,
  imageSrc,
}) => {
  return (
    <div className="bg-white  relative rounded-lg shadow-lg max-w-4xl mx-auto d p-6">
      {/* Image Section */}
      <div className="relative">
        <img
          src={defaultImg.src}
          alt={title}
          className="rounded-t-lg max-h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50 rounded-t-lg" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-lg">{subtitle}</p>
        </div>
      </div>

      {/* Server Stats Section */}
      <div className="flex justify-around absolute top-1/2 w-[90%] rounded-xl shadow-xl mx-auto left-0 right-0 h-24 bg-gray-100 py-4 rounded-b-lg divide-x-2 divide-second">
        <div className="text-center px-4">
          <p className="font-bold">{gameVersion}</p>
          <p>Версія гри</p>
        </div>
        <div className="text-center  px-4">
          <p className="font-bold">{mainWorldSize}</p>
          <p>Розмір основного світу</p>
        </div>
        <div className="text-center  px-4">
          <p className="font-bold">{netherSize}</p>
          <p>Розмір пекла</p>
        </div>
        <div className="text-center px-4">
          <p className="font-bold">{endWorldSize}</p>
          <p>Розмір ендер світу</p>
        </div>
        <div className="text-center px-4">
          <p className="font-bold text-red-500">{pvpStatus}</p>
          <p>PVP режим</p>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-6">
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ServerInfo;



{/* <CircularProgressbarWithChildren
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
        /> */}
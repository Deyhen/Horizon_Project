import TelegramLogo from '/public/images/telegramLogo.png';
import DiscordLogo from '/public/images/discordLogo.png';
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className="absolute bottom-0 -z-10 flex w-screen items-center justify-between px-4 py-4 text-first">
      <div className="flex flex-col">
        <span className="mb-2 text-xl font-bold">Contact us</span>
        <span>Email: support@minecraftlauncher.com</span>
        <span>Phone: +1 (555) 123-4567</span>
      </div>
      <div className="flex flex-col">
        <span className="mb-2 text-xl font-bold">Follow us</span>
        <div className="flex items-center justify-between">
          <Image
            src={TelegramLogo}
            alt="Telegram logo"
            width={400}
            height={400}
            className="h-8 w-8"
          />
          <Image
            src={DiscordLogo}
            alt="Discord logo"
            width={400}
            height={400}
            className="h-8 w-11"
          />
        </div>
      </div>
    </div>
  );
};

import { FaDiscord, FaTelegramPlane } from 'react-icons/fa';

export const Footer = () => {
  return (
    <div className="mt-8 flex w-full items-center justify-between px-4 py-4 text-secondary">
      <div className="flex flex-col">
        <span className="mb-2 text-xl font-bold">Contact us</span>
        <span>Email: support@minecraftlauncher.com</span>
        <span>Phone: +1 (555) 123-4567</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span className="mb-2 text-xl font-bold">Follow us</span>
        <div className="flex items-center justify-center space-x-6">
          <FaDiscord color="#9124BF" className="h-12 w-12" />
          <FaTelegramPlane color="#9124BF" className="h-12 w-12" />
        </div>
      </div>
    </div>
  );
};
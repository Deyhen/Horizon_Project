import { CabinetNavBarItem } from './CabinetNavBarItem';

export const CabinetNavbar = () => {
  return (
    <div className="flex flex-col space-y-8">
      <CabinetNavBarItem href="/cabinet/profile">Профіль</CabinetNavBarItem>
      <CabinetNavBarItem href="/cabinet/donate">Донат</CabinetNavBarItem>
    </div>
  );
};

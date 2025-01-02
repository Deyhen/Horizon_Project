import { Button } from '@/src/shared/ui';
import { User } from '@/src/store/user/types';

export const BalanceBlock = ({ user }: { user: User }) => {
  return (
    <div className="flex w-full items-center space-x-12 rounded-3xl border border-text_secondary bg-black bg-opacity-40 py-4 pl-8 text-lg text-text">
      <span>Баланс</span>
      <div className="flex grow flex-col divide-y divide-text_secondary">
        <div className="flex justify-between pb-4 pr-8">
          <div className="flex items-center justify-center space-x-4">
            <span>Донатна валюта:</span>
            <span className="font-semibold text-secondary">{user.donateCurrency}</span>
          </div>
          <Button className="!px-4 !py-1 !text-base">
            <span>Поповнити</span>
          </Button>
        </div>
        <div className="flex justify-between pr-8 pt-4">
          <div className="flex items-center justify-center space-x-4">
            <span>Ігрова валюта:</span>
            <span className="font-semibold text-secondary">{user.gameCurrency}</span>
          </div>
          <Button className="!px-4 !py-1 !text-base">
            <span>Поповнити</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

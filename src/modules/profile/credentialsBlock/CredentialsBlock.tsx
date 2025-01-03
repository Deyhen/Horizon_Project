import { Button } from '@/src/shared/ui';
import { User } from '@/src/store/user/types';
import { ChangePasswordForm } from './ChangePasswordForm';
import { Modal } from '../../providers';

export const CredentialsBlock = ({ user }: { user: User }) => {
  const handleChangePassword = () => {
    Modal.showModal({
      title: 'Зміна паролю',
      body: <ChangePasswordForm />,
    });
  };
  return (
    <div className="flex w-full flex-col divide-y divide-text_secondary rounded-3xl border border-text_secondary bg-black bg-opacity-40 text-lg">
      <div className="flex items-center space-x-32 px-8 py-4 text-text">
        <div className="flex space-x-4">
          <span>Username:</span>
          <span className="text-xl font-semibold text-secondary">{user.username}</span>
        </div>
        <span className="rounded-3xl border border-secondary px-3 py-1 text-base">{user.role}</span>
      </div>
      <div className="flex items-center justify-between px-8 py-4 text-text">
        <div className="flex space-x-4">
          <span>Password:</span>
          <span className="text-xl font-semibold text-secondary">***********</span>
        </div>
        <Button className="!px-4 !py-1 !text-base" onClick={handleChangePassword}>
          <span>Змінити</span>
        </Button>
      </div>
    </div>
  );
};

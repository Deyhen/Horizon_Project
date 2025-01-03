import { activateEmail, activatePromocode } from '@/src/api';
import { Button } from '@/src/shared/ui';
import { useAppDispatch } from '@/src/store';
import { User } from '@/src/store/user/types';
import { Modal } from '../../providers';
import { ActivatePromocodeForm } from './ActivatePromocodeForm';
import { AddNewPromocodesForm } from './AddNewPromocodesForm';

export const ActivationBlock = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();

  const handleEmailActivate = () => {
    dispatch(activateEmail())
      .unwrap()
      .then(() =>
        Modal.showModal({
          iconType: 'fullfilled',
          title: 'Посилання для підтвердження надіслано вам на пошту',
          confirmButton: true,
        }),
      )
      .catch(() =>
        Modal.showModal({
          iconType: 'rejected',
          title: 'Упс! Щось пішло не так',
          confirmButton: true,
        }),
      );
  };

  const handlePromocodeActivate = () => {
    Modal.showModal({ body: <ActivatePromocodeForm />, title: 'Уведіть ваш промокод' });
  };

  const handleAddNewPromocodes = () => {
    Modal.showModal({ body: <AddNewPromocodesForm />, title: 'Створіть нові промокоди' });
  };

  return (
    <div className="flex space-x-20">
      <Button onClick={handleEmailActivate}>
        <span>Активувати пошту</span>
      </Button>
      <div className="flex items-center">
        <Button onClick={handlePromocodeActivate}>
          <span>Активувати промокод</span>
        </Button>
        {user.role === 'admin' && (
          <Button
            className="ml-2 !px-2 !py-0 !text-3xl text-primary"
            onClick={handleAddNewPromocodes}
          >
            <span>+</span>
          </Button>
        )}
      </div>
    </div>
  );
};

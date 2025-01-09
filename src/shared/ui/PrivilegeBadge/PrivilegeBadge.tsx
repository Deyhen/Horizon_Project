import { User } from '@/src/store/user/types';
import clsx from 'clsx';
import styles from './PrivilegeBadge.module.css';

export const PrivilegeBadge = ({ privilege }: { privilege: User['privilege'] }) => {
  return (
    <span
      className={clsx('rounded-3xl border-4 px-3 py-0.5 text-xl font-bold', {
        'border-text_secondary !py-0 !text-lg !font-semibold text-text_secondary shadow-md':
          privilege === 'User',
        'border-secondary bg-black bg-opacity-40 text-secondary shadow-secondary [box-shadow:0_0_20px_#9124BF]':
          privilege === 'Vip',
        'border-focus bg-black bg-opacity-40 text-focus [box-shadow:0_0_20px_#DB85FF]':
          privilege === 'Deluxe',
        'text-secondary': privilege === 'God',
        [styles.rainbow]: privilege === 'God',
      })}
    >
      {privilege}
    </span>
  );
};

'use client';

import { ReactNode, useImperativeHandle, useState } from 'react';
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoEllipsisHorizontalCircleSharp,
} from 'react-icons/io5';
import Dialog from '@/src/shared/ui/Dialog/Dialog';
import { Button } from '@/src/shared/ui';

type ModalOptions = {
  title?: string;
  iconType?: 'fullfilled' | 'rejected' | 'pending';
  onClose?: () => void;
  confirmButton?: boolean;
  confirmContent?: string;
  body?: ReactNode;
};

export const ModalProvider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const renderStatusIcon = () => {
    switch (modalOptions?.iconType) {
      case 'fullfilled':
        return <IoCheckmarkCircleSharp size={128} className="text-green-500" />;
      case 'pending':
        return <IoEllipsisHorizontalCircleSharp size={128} className="text-yellow-500" />;
      case 'rejected':
        return <IoCloseCircleSharp size={128} className="text-red-500" />;
      default:
        return null;
    }
  };

  useImperativeHandle(modalRef, () => ({
    showModal: (options: ModalOptions) => {
      setModalOptions(options);
      setIsOpen(true);
    },
    closeModal: () => {
      setIsOpen(false);
      modalOptions?.onClose?.();
    },
  }));

  return (
    <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="flex w-fit max-w-lg flex-col items-center px-4">
        {modalOptions?.iconType && <div className="mb-12">{renderStatusIcon()}</div>}
        {modalOptions?.title && (
          <div className="whitespace-pre-line text-center text-2xl font-semibold text-secondary">
            {modalOptions?.title}
          </div>
        )}
        {modalOptions?.body && modalOptions.body}
        {modalOptions?.confirmButton && (
          <Button onClick={() => setIsOpen(false)} className="mt-12">
            {modalOptions.confirmContent ? modalOptions.confirmContent : 'Confirm'}
          </Button>
        )}
      </div>
    </Dialog>
  );
};

import { createRef } from 'react';

type ModalType = {
  showModal: (options: ModalOptions) => void;
  closeModal: () => void;
};
const modalRef = createRef<ModalType>();

export const Modal = {
  showModal: (options: ModalOptions) => {
    modalRef.current?.showModal(options);
  },
  closeModal: () => {
    modalRef.current?.closeModal();
  },
};

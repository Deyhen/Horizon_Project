import React, { useRef, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useClickOutside } from '../../utilities/useClickOutside';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = ''; // Clean up on unmount
    };
  }, [isOpen]);

  useClickOutside(dialogRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-40">
      <div
        ref={dialogRef}
        className="mt-40 flex max-h-fit min-h-40 min-w-80 max-w-fit flex-col rounded-xl bg-zinc-700 bg-opacity-40 p-6 shadow-xl"
      >
        <button onClick={onClose} className="self-end" aria-label="Close Modal">
          <RxCross2 size={24} className="text-secondary" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Dialog;

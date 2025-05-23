import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children,onClose, open, className = '' }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open && modal && !modal.open) {
      modal.showModal();
    }

    if (!open && modal && modal.open) {
      modal.close();
    }

  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')  // make sure this div exists in index.html
  );
}

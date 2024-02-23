import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal-root');
console.log(modalRoot);

const Modal = ({ close, largeImageURL }) => {
  const closeModal = useCallback(
    ({ target, currentTarget, code }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div onClick={closeModal} className={styles.overlay}>
      <div className={styles.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,

    modalRoot
  );
};

export default Modal;

import React, { useEffect, useRef } from 'react'
import { Children } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({ children, open, onClose, className = '' }) {

  const dilog = useRef();

  useEffect(() => {
    const modal = dilog.current;
    if (open) {
      modal.showModal();
    } 
    return () => modal.close();
  }, [open])

  return createPortal(
    <dialog ref={dilog} className={`modal ${className}`} onClose={onClose}>{children}</dialog>,
    document.getElementById('modal')
  );
}

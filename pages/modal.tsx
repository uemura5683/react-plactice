import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from 'react-hooks-use-modal';
import Link from "next/link"
import styles from '../styles/css/Modal.module.css'

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '60px 100px',
  borderRadius: '10px',
};

export default function Modal() {
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
  });
  return (
    <div className={styles.container}>
      <p>Modal is Open? {isOpen ? 'Yes' : 'No'}</p>
      <button
        className="btn btn-primary"
        onClick={open}>
        OPEN
      </button>
      { isOpen ? (
        <div className={styles.modal}>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <button
            className="btn btn-secondary"
            onClick={close}
          >
            CLOSE
          </button>
       </div>
      ) : null
      }
      <div className="btn-form grid">
        <Link href="/">back</Link>
      </div>
    </div>
  );
};
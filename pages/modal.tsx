import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from 'react-hooks-use-modal';
import styles from '../styles/Home.module.css'

const modalStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '60px 100px',
  borderRadius: '10px',
};

export default function App() {
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
  });
  return (
    <div>
      <p>Modal is Open? {isOpen ? 'Yes' : 'No'}</p>
      <button onClick={open}>OPEN</button>
      { isOpen ? (
        <div className="modal">
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <button onClick={close}>CLOSE</button>
       </div>
      ) : null
      }
    </div>
  );
};
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/css/ReactHook.module.css'

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const countUp = () => {
      setCounter(counter + 1);
  };

  const countDown = () => {
      setCounter(counter - 1);
  };

  const [isVisible, setVisibility] = useState(true);

  const updateVisibility = () => {
      setVisibility(!isVisible);
  };

  return (
      <>
        <div className={styles.container}>
          <p className={styles.leadhook}>
            useState()は関数コンポーネントでstateを管理するための機能であり。<br />
            初回のレンダー時に返される「state」はuseStateに第一引数に指定した値になります。
          </p>
          <button className={styles.btnhook} onClick={updateVisibility}>
              {isVisible ? '非表示にする' : '表示する'}
          </button>
          <div className={isVisible ? styles.visible : styles.invisible}>
              <p className={styles.leadhook}>現在の数値は{counter}です。</p>
              <button className={styles.btnhook} onClick={countUp}>+1</button>
              <button className={styles.btnhook} onClick={countDown}>-1</button>
          </div>
          <div className={styles.line}></div>
          <div className="flex">
            <p className={styles.description}>
              <Link href="/reacthook">back</Link>
            </p>
          </div>
        </div>
      </>
  )
}

export default Counter
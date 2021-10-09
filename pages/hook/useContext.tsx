import React, { createContext, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/css/ReactHook.module.css'

const Counter = () => {

  return (
      <>
        <div className={styles.container}>
          <p className={styles.leadhook}>
            useContext()はコンポーネントにぶら下がるツリー全体で使用できるグローバルを利用できる便利な機能です。
          </p>
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
import axios from 'axios';
import React, { useReducer } from 'react';
import Link from 'next/link';
import styles from '../../styles/css/ReactHook.module.css'

const Address = () => {
  // 初期のステートを定義する。
  const initialState = {
      isLoading: true,
      isError: '',
      data: ''
  }

  // reducerの関数を定義する。
  const reducerFunction = (state, action) => {
      switch (action.type) {
          case 'init':
              return initialState;
          case 'success':
              return {
                  isLoading: false,
                  isError: '',
                  data: action.payload
              };
          case 'fail':
              return {
                  isLoading: false,
                  isError: 'エラーが発生しました。',
                  data: ''
              };
          default:
              return state;
      }
  }

  const [dataState, dispatch] = useReducer(reducerFunction, initialState);

  const fetchData = () => {
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:3000/';
      // githubのAPIを叩く。
      const url = 'https://XXXXXXXXXXX/users/Tomoki-webpro';
      axios.get(url)
          .then(result => {
              const data = result.data;
              console.log(data)
              dispatch({ type: 'success', payload: data.login });
          })
          .catch(error => {
              dispatch({ type: 'fail' });
          });
  }

  return (
      <>
        <div className={styles.container}>
          <p className={styles.leadhook}>
          useReducer()はuseStateの代替であり、(state, action) newStateという形のリデューサを受け取り、現在のstateをdispatchとセットで返します。
          </p>
          <p className={styles.container}>
            <button onClick={fetchData}>githubからデータを取得する</button>
            <p>{ dataState.isLoading ? 'Loading...' : 'Finished!' }</p>
            <p>{ dataState.data}</p>
            <p>{ dataState.isError ? dataState.isError : '' }</p>
            <div className='line'></div>
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

export default Address
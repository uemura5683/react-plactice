import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import styles from '../styles/css/Contact.module.css';
import fetch from 'node-fetch';

const Contacts = () => {

  // 初期設定
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [modalIsOpen,setIsOpen] = React.useState(false);
  function closeModal(){
      setIsOpen(false);
  }
  const handleSubmit = e => {
    e.preventDefault();
    
    const ContactConfirm  = document.getElementsByClassName( styles.c_contact_form__form );
    const AlertTxt        = document.getElementsByClassName( styles.alert_warning );
    const AlertInner      = document.getElementsByClassName( styles.alert_inner_txt );
    const ContactCOmplete = document.getElementsByClassName( styles.skill__zoom_modal_block );
    const ContactElement: Element = document.getElementById( 'p-contact' );
    const ContactPosition: number = ContactElement.getBoundingClientRect().top;
    const currentPosition: number = window.pageYOffset;
    const targetPosition: number = ContactPosition + currentPosition;     
    console.log(ContactElement); 

    // エラーチェック
    if( AlertTxt[0] != undefined ) {
      AlertTxt[0].remove();
    }
    // エラーが発生したとき
    if( name == "" || email == "" || title == "" || body == "" ) {
      let alert_html = "<div class='" + styles.alert_warning + "'>"
      if( name == "" ) {
        alert_html += "<p class='" + styles.alert_inner_txt + "'>名前を入力してください。</p>";
      }
      if( email == "" ) {
        alert_html += "<p class='" + styles.alert_inner_txt + "'>メールアドレスを入力してください</p>";
      }
      if( title == "" ) {
        alert_html += "<p class='" + styles.alert_inner_txt + "'>タイトルを入力してください</p>";
      }
      if( body == "" ) {
        alert_html += "<p class='" + styles.alert_inner_txt + "'>本文を入力してください</p>";
      }
      alert_html += "</div>";
      ContactConfirm[0]
      .insertAdjacentHTML(
        'afterbegin', alert_html
      );
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });

    }
    // エラーがない場合はモーダルを表示する
    if( AlertInner.length == 0 ) {
      openModal();
    }
    function openModal() {
      setIsOpen(true);
    }
    function closeModal(){
      setIsOpen(false);
    }
  };

  function ModalConfirm(props) {
    const data = {
      email: email,
      name: name,
      title: title,
      body: body
    };
    if(props.isOpen == true) {      
      return (
        <>
            <div className={styles.c_contact_confirm}>
                <p className={styles.contact__confirm_txt}>入力内容が正しければ「送信する」をクリックしてください。</p>
                <table>
                    <tbody>
                    <tr>
                        <th>お名前</th><td>{data.name}</td>
                    </tr>
                    <tr>
                        <th>メールアドレス</th><td>{data.email}</td>
                    </tr>
                    <tr>
                        <th>お問い合わせの内容</th><td>{data.title}</td>
                    </tr>
                    <tr className={styles.borderline}>
                        <th>お問い合わせ詳細</th><td>{data.body}</td>
                    </tr>
                    </tbody>
                </table>
                <div className={styles.btn_area}>
                    <button
                      className={styles.btn_white}
                      type="submit"
                      onClick={FormSubmit}
                    >
                        送信する
                    </button>
                </div>
                <button className={styles.btn_close} onClick={closeModal}>close</button> 
            </div>
            <div className={styles.contact__form__bg} onClick={closeModal}></div>
        </>
      )
    } else {
      return null;
    }
  }

  const FormSubmit = async e => {
    e.preventDefault();
    const getbody = document.body
        , datas = { email: email, name: name, title: title, body: body };
        console.log(process.env.MICRO_CMS);
    axios({
      method: "post",
      url: "https://uemura5683.microcms.io/api/v1/contact",
      data: datas,
      headers: {
        "Content-Type": "application/json",
        "X-WRITE-API-KEY": process.env.MICRO_CMS
      }
    })
    .then(() => {
      setIsOpen(false);
      let alert_html = "<div class='" + styles.c_contact__complete + "'><p>この度はお問い合わせメールをお送りいただきありがとうございます。<br>今しばらくお待ちくださいますようよろしくお願い申し上げます。<br>なお、しばらくたっても返信、返答がない場合は、<br>お客様によりご入力いただいたメールアドレスに誤りがある場合がございます。<br>その際は、お手数ですが再度お問い合わせいただけますと幸いです。<br>5秒後にリロードします。</p></div>";
      getbody.insertAdjacentHTML( 'afterbegin', alert_html );
      let countup = function() {
        location.reload();
      }
      setTimeout(countup, 5000);
    })
    .catch(err => {
      console.log(err);
    });

    const res = await fetch('/api/send', {
      body: JSON.stringify({
        email: email,
        message: body
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const result = await res.json()
  }

  useEffect(() => {
    let rootElement = document.getElementById("modalArea");
    ReactDOM.render(
      <React.StrictMode>
          <ModalConfirm
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
          />
      </React.StrictMode>,
      rootElement
    );
  });

  return (
    <>
    <div className={styles.container} id="p-contact">
        <div className={styles.c_contact_form__inner}>
        <p className={styles.c_contact_form__txt}>
            どんな些細でもいいですので気軽にお問い合わせください。<br/>
            <a href="https://twitter.com/uemuragame5683" target="_blank" rel="noreferrer">Twitter</a>でも受け付けております。
        </p>
        <form className={styles.c_contact_form__form}>
            <div className={styles.c_contact_form__content}>
            <label>あなたの名前</label>
            <input
                type="text"
                placeholder="名前を入力してください"
                id="name"
                name="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            </div>
            <div className={styles.c_contact_form__content}>
            <label>メールアドレス</label>
            <input
                type="email"
                placeholder="メールアドレスを入力してください"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            </div>
            <div className={styles.c_contact_form__content}>
            <label>お問い合わせ内容</label>
            <input
                type="text"
                placeholder="タイトルを入力してください"
                id="title"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            </div>
            <div className={styles.c_contact_form__content}>
            <label>お問い合わせ詳細</label>
            <textarea
                placeholder="本文を入力してください"
                name="body"
                value={body}
                onChange={e => setBody(e.target.value)}
                required
            />
            </div>
            <div className={styles.btn_area}>
            <button className={styles.btn_black} type="submit" onClick={handleSubmit}>送信内容を確認する</button>
            </div>
        </form>
        </div>
        <div className="flex">
          <p className={styles.description}>
            <Link href="/">TOP</Link>
          </p>
        </div>
        <div id="modalArea" className={styles.modalarea}></div>
    </div>    
    </>
  )
};

export default Contacts;
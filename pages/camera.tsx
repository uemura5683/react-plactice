import { useRef, useState, useCallback } from "react"
import Webcam from "react-webcam"
import Link from "next/link"
import styles from '../styles/Home.module.css'

const videoConstraints = {
  width: 1500,
  height: 1000,
  facingMode: "user",
};

export default function App() {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>開始</button>
      )}
      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>終了</button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={1500}
              height={1000}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <button onClick={capture}>キャプチャ</button>
        </>
      )}
      {url && (
        <>
          <div>
            <button
              onClick={() => {
                setUrl(null);
              }}
            >
              削除
            </button>
          </div>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        </>
      )}
      <div className="btn-form grid">
        <Link href="/">back</Link>
        <a
          href="https://dev.classmethod.jp/articles/get-image-with-react-webcam-and-typescript/"
          target="_blank"
          rel="noreferrer noopener"
        >
          　参考記事
        </a>
      </div>
    </>
  );
};
import { useRef, useState, useCallback } from "react"
import Webcam from "react-webcam"
import Link from "next/link"
import styles from '../styles/css/Camera.module.css'

const videoConstraints = {
  width: 1500,
  height: 1000,
  facingMode: "user",
};

export default function Camera() {
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
      <div className={styles.container}>
        {isCaptureEnable || (
            <button
              className="btn btn-primary"
              onClick={() => setCaptureEnable(true)}
            >
              開始
            </button>
        )}
        {isCaptureEnable && (
          <>
              <button
                className="btn btn-primary"
                onClick={() => setCaptureEnable(false)}>
                終了
              </button>
              <div className={styles.movie}>
                <Webcam
                  audio={false}
                  width={1500}
                  height={1000}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={capture}
              >
                キャプチャ
              </button>
          </>
        )}
        {url && (
          <>
            <img src={url} alt="Screenshot" />
            <button
              className="btn btn-secondary"
              onClick={() => {
                setUrl(null);
              }}
            >
              削除
            </button>
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
      </div>
    </>
  );
};
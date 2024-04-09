import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import styles from "./MalcolmVideo.module.scss";

export const MalcolmVideo = () => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    if (playedSeconds >= 58) {
      setPlaying(false);
    }
  };

  const handleReady = () => {
    playerRef.current.seekTo(15);
  };

  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        ref={playerRef}
        className={styles.reactPlayer}
        url="https://youtu.be/OUcw3P8JlNM"
        playing={playing}
        onReady={handleReady}
        onProgress={handleProgress}
      />
    </div>
  );
};

import { useRef, useState } from "react";

function App() {

  const videoRef = useRef(null);

  const videos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
];


  const [currentIndex, setCurrentIndex] = useState(0);

  function playVideo() {
    videoRef.current.play();
  }

  function pauseVideo() {
    videoRef.current.pause();
  }

  function forwardVideo() {
    if (videoRef.current.currentTime + 5 < videoRef.current.duration) {
      videoRef.current.currentTime += 5;
    }
  }

  function rewindVideo() {
    if (videoRef.current.currentTime > 5) {
      videoRef.current.currentTime -= 5;
    } else {
      videoRef.current.currentTime = 0;
    }
  }

  function nextVideo() {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function prevVideo() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  return (
    <div className="container">
      <video
        ref={videoRef}
        src={videos[currentIndex]}
        width="470"
        controls
      />

      <div className="btnContainer">
        <button onClick={prevVideo}>⏮ Previous</button>
        <button onClick={playVideo}>▶️ Play</button>
        <button onClick={pauseVideo}>⏸ Pause</button>
        <button onClick={rewindVideo}>⏪ Forward </button>
        <button onClick={forwardVideo}>⏩ Rewind</button>
        <button onClick={nextVideo}>⏭ Next</button>
      </div>
    </div>
  );
}

export default App;

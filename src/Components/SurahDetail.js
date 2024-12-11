import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  VolumeX,
  PlayCircle,
  PauseCircle,
  ChevronLeft,
} from "lucide-react";

const SurahDetail = ({ surah, toggleMobileSidebar, isMobileSidebarOpen }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const progress =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progress);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const toggleVolume = () => {
    setVolume(volume === 0 ? 1 : 0);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="flex-1 flex flex-col bg-white mb-4 p-4 md:p-8 overflow-hidden">
      {/* Mobile Back Button */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden mb-8 flex items-center text-gray-600 hover:text-blue-600"
      >
        <ChevronLeft className="mr-8 mt-5 " /> Surahs
      </button>

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            {surah.asma.en.long}
          </h2>
          <p className="text-center text-gray-600 mt-2">
            {surah.type.en} • {surah.ayahCount} Verses
          </p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 mb-6 flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
            {surah.asma.ar.long}
          </h3>

          <div className="flex items-center space-x-6">
            <button
              onClick={toggleVolume}
              className="p-2 bg-white rounded-full shadow hover:bg-blue-100 transition"
            >
              {volume === 0 ? (
                <VolumeX className="text-gray-600" size={24} />
              ) : (
                <Volume2 className="text-gray-600" size={24} />
              )}
            </button>
            <button
              onClick={togglePlay}
              className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
            >
              {isPlaying ? <PauseCircle size={32} /> : <PlayCircle size={32} />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-2 bg-blue-200 rounded-full appearance-none cursor-pointer"
          />
        </div>

        <audio
          ref={audioRef}
          src={surah.recitation.full}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>
    </div>
  );
};

export default SurahDetail;

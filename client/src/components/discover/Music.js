import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import ElevatorMusic from "../../images/Elevator.mp3";
import FluffingADuck from "../../images/FluffingDuck.mp3";
import { useEffect } from "react";

function Music() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };
  useEffect(() => {
    setIsPlaying(true);
  }, []);

  return (
    <div>
      <div>
        <IconButton onClick={() => playSong(ElevatorMusic)}>
          <VolumeUpIcon />
        </IconButton>
        <IconButton onClick={() => playSong(FluffingADuck)}>
          <VolumeUpIcon />
        </IconButton>
        <IconButton onClick={pauseSong}>
          <PauseCircleFilledIcon />
        </IconButton>
        {currentSong && isPlaying && (
          <AudioPlayer
            autoPlay
            src={currentSong}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Music;

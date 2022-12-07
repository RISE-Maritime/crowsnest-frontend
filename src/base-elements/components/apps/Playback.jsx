import React from "react";
import { IconButton, Slider, Stack, Box, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { styled, useTheme } from "@mui/material/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { playbackState } from "../../../recoil/atoms";
import { useRecoilState } from "recoil";
// import { mqttPublishRemote } from "../../MqttConnectionREMOTE";

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function Playback({ setIsDraggable, isDraggable }) {
  const theme = useTheme();
  const [playbackObj, setPlaybackObj] = useRecoilState(playbackState);

  const playPause = () => {
    let action = "";

    setPlaybackObj({
      ...playbackObj,
      is_playing: !playbackObj.is_playing,
    });

    let topic = "/playback/action";
    let qos = 0;

    if (!playbackObj.is_playing === true) {
      action = "start";
    } else {
      action = "stop";
    }

    let payload = { actionPlay: action };

    // mqttPublishRemote(topic, qos, payload);
  };

  const changeTimePointer = (value) => {
    let topic = "/playback/action";
    let qos = 0;  
    let payload = { timeLinePos: value };
    // mqttPublishRemote(topic, qos, payload);

    setPlaybackObj({
      ...playbackObj,
      timeline_position: value,
    });
  };

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }

  const toggleDraggable = () => {
    setIsDraggable(!isDraggable);
  };

  return (
    <div style={{ width: "100%" }}>
      <Stack
        direction={"row"}
        alignItems="center"
        justifyContent="space-around"
      >
        <h3>Playback</h3>

        {isDraggable ? (
          <IconButton onClick={toggleDraggable} sx={{ height: 35, width: 35 }}>
            <LockOpenIcon />
          </IconButton>
        ) : (
          <IconButton onClick={toggleDraggable} sx={{ height: 35, width: 35 }}>
            <LockIcon />
          </IconButton>
        )}
      </Stack>

      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ width: "98%" }}
      >
        {playbackObj.is_playing ? (
          <IconButton onClick={playPause}>
            <PauseIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
        ) : (
          <IconButton onClick={playPause}>
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
        )}

        <div style={{ width: "100%" }}>
          <Slider
            aria-label="time-indicator"
            size="small"
            value={playbackObj.timeline_position}
            min={0}
            step={1}
            max={playbackObj.duration}
            onChange={(_, value) => changeTimePointer(value)}
            sx={{
              width: "100%",
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${
                    theme.palette.mode === "dark"
                      ? "rgb(255 255 255 / 16%)"
                      : "rgb(0 0 0 / 16%)"
                  }`,
                },
                "&.Mui-active": {
                  width: 20,
                  height: 20,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: -2,
            }}
          >
            <TinyText>{formatDuration(playbackObj.timeline_position)}</TinyText>
            <TinyText>
              -
              {formatDuration(
                playbackObj.duration - playbackObj.timeline_position
              )}
            </TinyText>
          </Box>
        </div>
      </Stack>
    </div>
  );
}

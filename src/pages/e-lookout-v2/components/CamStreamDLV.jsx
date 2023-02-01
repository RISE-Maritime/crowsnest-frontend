import React from "react"

export default function CamStream({ ID }) {
  return <img style={{ width: "25vw" }} src={"https://opendlv.io/mjpg/video.mjpg?camera=" + ID} />
}

import React from "react"
import LidarChart from "./LidarChart"

export default function LidarController() {
 

  return (
    <div>
      {/* <LidarChart keyExpression={"rise/v0/boatswain/pubsub/point_cloud_simplified/ydlidar"} /> */}
      <LidarChart keyExpression={"rise/v0/boatswain/pubsub/point_cloud/ydlidar"} />
    </div>
  )
}

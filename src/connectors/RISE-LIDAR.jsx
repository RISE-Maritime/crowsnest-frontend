// import React, { useEffect, useState } from "react";
// import Paho from "paho-mqtt";
// import { atom, useSetRecoilState, useRecoilState } from "recoil";

// // Selected vessel profile
// export const atomLidarPoints = atom({
//   key: "lidar_points",
//   default: [],
// });

// export const atomLidarOrigin = atom({
//   key: "lidar_origin",
//   default: [57.65271, 12.00188],
// });

// export const atomLidarMetadata = atom({
//   key: "lidar_metadata",
//   default: {
//     connected: false,
//   },
// });

// export default function RiseLIDAR() {
//   const setLidarPoints = useSetRecoilState(atomLidarPoints);
//   const setLidarOrigin = useSetRecoilState(atomLidarOrigin);
//   const [lidarMetadata, setLidarMetadata] = useRecoilState(atomLidarMetadata);
//   const [client, setClient] = useState(null);

//   useEffect(() => {
//     clientChanged();
//   }, [client]);

//   const clientChanged = () => {
//     if (client === null) {
//       console.log("Connecting RISE LIDAR TEST...");
//       setClient(
//         new Paho.Client("ws://broker.mo.ri.se/:443", "muppet" + Math.random())
//       );
//     } else {
//       client.onConnectionLost = (response) => {
//         console.log(Date.now() + " Connection lost:" + response.errorMessage);
//         setLidarMetadata({ ...lidarMetadata, connected: false });
//       };

//       client.onMessageArrived = async (message) => {
//         if (!lidarMetadata.connected) {
//           setLidarMetadata({ ...lidarMetadata, connected: true });
//         }
//         const content = message.payloadString;
//         const lidarData = JSON.parse(content);
//         console.log("Data", lidarData);
//         // console.log("Points", lidarData.points);
//         // console.log("Origin", lidarData.origin.coordinates);
//         setLidarPoints(lidarData.points);
//         setLidarOrigin(lidarData.origin.coordinates);
//       };

//       const connectionProperties = {
//         onSuccess: () => {
//           client.subscribe("TEST/lidar");
//         },
//         mqttVersion: 4,
//         useSSL: true,
//         userName: "morise",
//         password: "mqttmightbeagoodoption?",
//       };

//       client.connect(connectionProperties);
//     }
//   };

//   return <div></div>;
// }

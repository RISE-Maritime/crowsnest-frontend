import React, { useEffect, useState } from "react";
import Paho from "paho-mqtt";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import {
  atomOwnShipData,
  atomSelectedVesselModel,
} from "../pages/home/components/PlatformPicker";

// Rise MQTT stream connection state
export const atomRiseAisMetadata = atom({
  key: "rise_ais",
  default: {
    connected: false,
  },
});

export const atomRiseAisTargetList = atom({
  key: "rise_ais_target_list",
  default: [],
});





export default function RiseAIS() {
  const [client, setClient] = useState(null);
  const setAisTargetList = useSetRecoilState(atomRiseAisTargetList);
  const [vesselModel, setVesselModel] = useRecoilState(atomSelectedVesselModel);
  const [ownShipData, setOwnShipData] = useRecoilState(atomOwnShipData);
  const [isRiseAisStreamOpen, setIsRiseAisStreamOpen] =
    useRecoilState(atomRiseAisMetadata);

  useEffect(() => {
    clientChanged();
  }, [client]);

  const clientChanged = () => {
    let test = {};

    if (client === null) {
      console.log("Connecting RISE AIS...");
      setClient(
        new Paho.Client("ws://localhost:80/mqtt", "muppet" + Math.random())
      );
    } else {
      client.onConnectionLost = (response) => {
        console.log(Date.now() + " Connection lost:" + response.errorMessage);
        setIsRiseAisStreamOpen({ ...isRiseAisStreamOpen, connected: false });
      };

      client.onMessageArrived = async (message) => {
        // Do not update if it is already True
        if (!isRiseAisStreamOpen.connected) {
          setIsRiseAisStreamOpen({ ...isRiseAisStreamOpen, connected: true });
        }

        // console.log("DATA", message);
        const content = message.payloadString;
        const shipData = JSON.parse(content);
        // console.log("AIS:", shipData);

     

        if (shipData.imo_num === 9606900) {
          let timeAtShip = new Date(shipData.timestamp * 1000);
          let timeAtShipp = timeAtShip
            .toISOString()
            .split("T")[1]
            .split(".")[0];

          setOwnShipData({
            ...ownShipData,
            externalTimestamp: timeAtShipp,
            sog: shipData.sog,
            cog: shipData.cog,
            heading: shipData.heading,
            latitude: shipData.lat,
            longitude: shipData.lon,
            draught: shipData.draught,
            destination: shipData.destination,
            navStatus: shipData.nav_status,
          });
          setVesselModel({
            ...vesselModel,
            name: shipData.shipname,
            beam: shipData.b,
            loa: shipData.l,
          });
        } 
        else if (shipData.lat < 60 & shipData.lat > 56 & shipData.lon > 10 & shipData.lon < 16){
          test = {
            ...test,
            [shipData.mmsi]: shipData,
          };
  
          setAisTargetList(test);
        }

        

      };

      const connectionProperties = {
        onSuccess: () => {
          client.subscribe("CROWSNEST/AIS/#");
        },
        mqttVersion: 4,
        useSSL: true,
        userName: "morise",
        password: "mqttmightbeagoodoption?",
      };

      client.connect(connectionProperties);
    }
  };

  return <div></div>;
}

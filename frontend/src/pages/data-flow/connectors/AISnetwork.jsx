import React, {useEffect, useState} from 'react'
import Paho from "paho-mqtt";
// Atoms
import {atomSelectedVesselModel} from '../../home/components/vesselPicker'
import { useRecoilValue, atom, useRecoilState } from "recoil";

export const atomTargetList = atom({
    key: "target_list",
    default: null,
  });

export const atomOwnVesselAis = atom({
    key: "own_vessel_ais",
    default: null,
  });
  



// AIS network connector 
// -------------------------------------------

const tryDisconnecting = (client) => {
    if (client !== null) {
      try {
        console.log("Disconnecting...");
        client.disconnect();
      } catch (error) {
        // Do nothing, client is already disconnected.
      }
    }
  };

// Handling API request


export function ConnectToAIS() {

  
    const [aisOwnData, setAisOwnData] = useRecoilState(atomOwnVesselAis);
    const [selectedVesselModel, setSelectedVesselModel] = useRecoilState(atomSelectedVesselModel);

   

    return 'AIS connection requested'
  }


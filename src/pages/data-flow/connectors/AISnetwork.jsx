 
// Atoms
//import {atomSelectedVesselModel} from '../../home/components/vesselPicker'
import {atom } from "recoil";

export const atomTargetList = atom({
    key: "target_list",
    default: null,
  });

export const atomOwnVesselAis = atom({
    key: "own_vessel_ais",
    default: null,
  });
  
/*
Commented because this functions are not used. 


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

  */ 

import React, { useState, useEffect } from "react";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { Grid, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paho from "paho-mqtt";

// Selected vessel profile
export const atomSelectedOwnShipDatSource = atom({
  key: "selected_own_ship_data_source",
  default: null,
});

// Selected vessel profile
export const atomSelectedVesselModel = atom({
  key: "selected_vessel_model",
  default: {
    imo: 1234567,
    mmsi: 230629000,
    name: "Ship Name",
    call_sign: "",
    loa: 100,
    beam: 15,
    vessel_type: "Unknown",
    dwt: 4000,
    gt: 2000,
  },
});

export const atomOwnShipData = atom({
  key: "own_ship_data",
  default: {
    externalTimestamp: "2020",
    sog: 0,
    cog: 0,
    heading: 0,
    latitude: 0,
    longitude: 0,
    draught: 0,
    destination: "",
    navStatus: 0,
  },
});

/* TODO: removed if unused
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
*/

// Component styling
const Input = styled("input")({
  display: "none",
});

export default function VesselPicker() {
  const [vesselModel, setVesselModel] = useRecoilState(atomSelectedVesselModel);
  const setOwnShipDataSource = useSetRecoilState(atomSelectedOwnShipDatSource);
  const [ownShipData, setOwnShipData] = useRecoilState(atomOwnShipData);
  const [client, setClient] = useState(null);
  const [isAISConnectionOpen, setIsAISConnectionOpen] = useState(false);

  const setMMSI = (event) => {
    console.log(event.target.value);
    setVesselModel({ ...vesselModel, mmsi: event.target.value });
  };

  const connectAIS = () => {
    setOwnShipDataSource("ais");
    setIsAISConnectionOpen(true);
  };

  useEffect(() => {
    if (isAISConnectionOpen) {
      clientChanged();
    }
  }, [client, isAISConnectionOpen]);

  const clientChanged = () => {
    if (client === null) {
      console.log("client is null");
      setClient(new Paho.Client("ws://broker.mo.ri.se/:443", "muppet" + Math.random()));
    } else {
      client.onConnectionLost = (response) => {
        console.log(Date.now() + " Connection lost:" + response.errorMessage);
      };

      client.onMessageArrived = async (message) => {
        // console.log("DATA", message);
        const content = message.payloadString;
        const shipData = JSON.parse(content);
        if (shipData.imo_num === 9606900) {
          console.log("DATA", shipData);

          let timeAtShip = new Date(shipData.timestamp * 1000)
          let timeAtShipp = timeAtShip.toISOString().split('T')[1].split('.')[0]

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
      };

      const connectionProperties = {
        onSuccess: () => {
          client.subscribe("PONTOS/AIS/#");
        },
        mqttVersion: 4,
        useSSL: true,
        userName: "morise",
        password: "mqttmightbeagoodoption?",
      };

      client.connect(connectionProperties);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "grid", placeItems: "center" }}>
        <h2>Own ship data source</h2>
      </Grid>
      <Grid item xs={4} sx={{ display: "grid", placeItems: "center" }}>
        <h3>Onboard</h3>
        <Button>Pilot boat 729</Button>
        <Button>11-00</Button>
        <Button>Svanen</Button>
      </Grid>
      <Grid item xs={4} sx={{ display: "grid", placeItems: "center" }}>
        <h3>AIS network</h3>
        <TextField
          label="MMSI"
          variant="outlined"
          size="small"
          value={vesselModel.mmsi}
          onChange={(event) => setMMSI(event)}
        />
        <Button onClick={connectAIS}>Connect</Button>
      </Grid>
      <Grid item xs={4} sx={{ display: "grid", placeItems: "center" }}>
        <h3>Log file</h3>
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" multiple type="file" />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      </Grid>
    </Grid>
  );
}

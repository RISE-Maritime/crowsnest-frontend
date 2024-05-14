import React from "react"
import { Stack } from "@mui/material"
// Icons
import CellWifiIcon from "@mui/icons-material/CellWifi"
import LanIcon from "@mui/icons-material/Lan"
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt"
// Atoms
import { useRecoilValue } from "recoil"
import { atomKeelsonConnectionState, atomMQTTconnectionState, atomDeviceConnectionState } from "../../../recoil/atoms"
import ConnectorCard from "./ConnectorCard"

export default function ConnectorsSummaryCards() {
  const keelsonConnectionState = useRecoilValue(atomKeelsonConnectionState)
  const mqttConnectionState = useRecoilValue(atomMQTTconnectionState)
  const deviceConnectionState = useRecoilValue(atomDeviceConnectionState)

  return (
    <Stack direction={"row"} spacing={2}>
      <ConnectorCard connectionState={keelsonConnectionState} connectionName={"Keelson"} iconSymbol={<CellWifiIcon />} />
      <ConnectorCard connectionState={mqttConnectionState} connectionName={"MQTT"} iconSymbol={<CellWifiIcon />} />
      <ConnectorCard connectionState={deviceConnectionState} connectionName={"Device"} iconSymbol={<LanIcon />} />
      <ConnectorCard
        connectionState={keelsonConnectionState}
        connectionName={"Internet/LTE"}
        iconSymbol={<SignalCellularAltIcon />}
      />
    </Stack>
  )
}

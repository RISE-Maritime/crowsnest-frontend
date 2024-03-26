import React, { useState } from "react"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import LogoDevIcon from "@mui/icons-material/LogoDev"
import { TextField, Tooltip } from "@mui/material"
import axios from "axios"
import ByteBuffer from "bytebuffer"
import protobuf from "protobufjs"
import bundle from "../../../proto/bundle.json"
import RestartAltIcon from "@mui/icons-material/RestartAlt"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"

export default function TableDocker({ dockerContainers, URL }) {
  const [logOutput, setLogOutput] = useState("Logs output if requested by pressing the button in the table")

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 250 },
    {
      field: "created",
      headerName: "Created",
      width: 170,
      valueFormatter: params => new Date(params.value).toLocaleString("SV-sv"),
    },
    { field: "image", headerName: "Image", width: 200 },
    {
      field: "last_start",
      headerName: "Last start",
      width: 170,
      valueFormatter: params => new Date(params.value).toLocaleString("SV-sv"),
    },
    { field: "restart_policy", headerName: "Restart policy", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: params => {
        if (params.value == "running") {
          return <span style={{ color: "green", fontWeight: "bold" }}>{params.value.toUpperCase()}</span>
        } else {
          return <span style={{ color: "red", fontWeight: "bold" }}>{params.value.toUpperCase()}</span>
        }
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Get Logs",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <Tooltip title="Get LOGS" key={"erfeq"}>
            <GridActionsCellItem
              key={"ertgrwta"}
              icon={<LogoDevIcon />}
              label="Get logs"
              sx={{
                color: "primary.main",
              }}
              onClick={handleClickGetLogs(id)}
            />
          </Tooltip>,
        ]
      },
    },

    {
      field: "restart",
      type: "actions",
      headerName: "Restart",
      width: 80,
      cellClassName: "actions",
      getActions: rowData => {
        console.log("🚀 ~ file: TableDocker.jsx:78 ~ TableDocker ~ id, status:", rowData)

        if (rowData.row.status == "running") {
          return [
            <Tooltip title="Stop" key={"regeere"}>
              <GridActionsCellItem
                icon={<StopIcon />}
                label="Stop"
                sx={{
                  color: "#ff0000",
                }}
                onClick={handleClickStop(rowData?.row.id)}
              />
            </Tooltip>,
            <Tooltip title="Restart" key={"ertgeregrewrwta"}>
              <GridActionsCellItem
                icon={<RestartAltIcon />}
                label="Restart"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleClickRestart(rowData?.row.id)}
              />
            </Tooltip>,
          ]
        } else {
          return [
            <Tooltip title="Start" key={"etrrtrg"}>
              <GridActionsCellItem
                key={"ertgeregrewrferrwta"}
                icon={<PlayArrowIcon />}
                label="Start"
                sx={{
                  color: "primary.main",
                }}
                onClick={handleClickStart(rowData.row.id)}
              />
            </Tooltip>,
          ]
        }
      },
    },
  ]

  const handleClickGetLogs = id => () => {
    console.log("Get Logs for ", id)

    axios.get(URL + "?logs=" + id).then(res => {
      let time = new Date()
      console.log("Loop Response: ", time, res)

      let data_values = res.data[0].value
      let bytes = new Uint8Array(ByteBuffer.fromBase64(data_values).toArrayBuffer())
      const root = protobuf.Root.fromJSON(bundle)
      const Envelope = root.lookupType("Envelope")
      const decodedEnvelope = Envelope.decode(bytes)
      const envelopeEncodedAtDate = new Date(
        decodedEnvelope.enclosedAt.seconds * 1000 + decodedEnvelope.enclosedAt.nanos / 1000000
      )
      // setTimeMsg(envelopeEncodedAtDate.toLocaleString("sv-SV"))

      console.log("🚀 ~ file: DockerMonitoring.jsx:35 ~ axios.get ~ envelopeEncodedAtDate:", envelopeEncodedAtDate)

      let decoder = new TextDecoder("utf-8")
      let decodedData = decoder.decode(decodedEnvelope.payload)
      let jsonData = JSON.parse(decodedData)
      console.log("🚀 ~ file: DockerMonitoring.jsx:30 ~ axios.get ~ jsonData:", jsonData)
      // setDockerContainers(jsonData)
      setLogOutput("Get Logs for " + id + " \n\n" + jsonData)
    })
  }

  const handleClickRestart = id => () => {
    console.log("Restart container ", id)

    axios.get(URL + "?restart=" + id).then(res => {
      let time = new Date()
      console.log("Response: ", time, res)

      let data_values = res.data[0].value
      let bytes = new Uint8Array(ByteBuffer.fromBase64(data_values).toArrayBuffer())
      const root = protobuf.Root.fromJSON(bundle)
      const Envelope = root.lookupType("Envelope")
      const decodedEnvelope = Envelope.decode(bytes)
      const envelopeEncodedAtDate = new Date(
        decodedEnvelope.enclosedAt.seconds * 1000 + decodedEnvelope.enclosedAt.nanos / 1000000
      )
      // setTimeMsg(envelopeEncodedAtDate.toLocaleString("sv-SV"))

      console.log("🚀 ~ file: DockerMonitoring.jsx:35 ~ axios.get ~ envelopeEncodedAtDate:", envelopeEncodedAtDate)

      let decoder = new TextDecoder("utf-8")
      let decodedData = decoder.decode(decodedEnvelope.payload)
      let jsonData = JSON.parse(decodedData)
      console.log("🚀 ~ file: DockerMonitoring.jsx:30 ~ axios.get ~ RESTART:", jsonData)
      // setDockerContainers(jsonData)
      // setLogOutput("Get Logs for " + id + " \n\n"+ jsonData)
    })
  }

  const handleClickStart = id => () => {
    console.log("Restart container ", id)

    axios.get(URL + "?start=" + id).then(res => {
      let time = new Date()
      console.log("Response: ", time, res)

      let data_values = res.data[0].value
      let bytes = new Uint8Array(ByteBuffer.fromBase64(data_values).toArrayBuffer())
      const root = protobuf.Root.fromJSON(bundle)
      const Envelope = root.lookupType("Envelope")
      const decodedEnvelope = Envelope.decode(bytes)
      const envelopeEncodedAtDate = new Date(
        decodedEnvelope.enclosedAt.seconds * 1000 + decodedEnvelope.enclosedAt.nanos / 1000000
      )
      // setTimeMsg(envelopeEncodedAtDate.toLocaleString("sv-SV"))

      console.log("🚀 ~ file: DockerMonitoring.jsx:35 ~ axios.get ~ envelopeEncodedAtDate:", envelopeEncodedAtDate)

      let decoder = new TextDecoder("utf-8")
      let decodedData = decoder.decode(decodedEnvelope.payload)
      let jsonData = JSON.parse(decodedData)
      console.log("🚀 ~ file: DockerMonitoring.jsx:30 ~ axios.get ~ START:", jsonData)
      // setDockerContainers(jsonData)
      // setLogOutput("Get Logs for " + id + " \n\n"+ jsonData)
    })
  }

  const handleClickStop = id => () => {
    console.log("Restart container ", id)

    axios.get(URL + "?stop=" + id).then(res => {
      let time = new Date()
      console.log("Response: ", time, res)

      let data_values = res.data[0].value
      let bytes = new Uint8Array(ByteBuffer.fromBase64(data_values).toArrayBuffer())
      const root = protobuf.Root.fromJSON(bundle)
      const Envelope = root.lookupType("Envelope")
      const decodedEnvelope = Envelope.decode(bytes)
      const envelopeEncodedAtDate = new Date(
        decodedEnvelope.enclosedAt.seconds * 1000 + decodedEnvelope.enclosedAt.nanos / 1000000
      )
      // setTimeMsg(envelopeEncodedAtDate.toLocaleString("sv-SV"))

      console.log("🚀 ~ file: DockerMonitoring.jsx:35 ~ axios.get ~ envelopeEncodedAtDate:", envelopeEncodedAtDate)

      let decoder = new TextDecoder("utf-8")
      let decodedData = decoder.decode(decodedEnvelope.payload)
      let jsonData = JSON.parse(decodedData)
      console.log("🚀 axios.get ~ STOP:", jsonData)
      // setDockerContainers(jsonData)
      // setLogOutput("Get Logs for " + id + " \n\n"+ jsonData)
    })
  }

  return (
    <div>
      <DataGrid
        rows={dockerContainers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />

      <TextField
        sx={{ width: "100%", marginTop: "1rem" }}
        id="outlined-multiline-static"
        label="Logs"
        multiline
        rows={10}
        defaultValue="Logs output if requested by pressing the button in the table"
        value={logOutput}
      />
    </div>
  )
}

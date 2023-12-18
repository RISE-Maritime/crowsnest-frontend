import React, { useState } from "react"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import LogoDevIcon from "@mui/icons-material/LogoDev"
import { TextField } from "@mui/material"
import axios from "axios"
import ByteBuffer from "bytebuffer"
import protobuf from "protobufjs"
import bundle from "../../../proto/bundle.json"

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
    { field: "status", headerName: "Status", width: 100, valueFormatter: params => params.value.toUpperCase() },
    {
      field: "actions",
      type: "actions",
      headerName: "Get Logs",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={"ertgrwta"}
            icon={<LogoDevIcon />}
            label="Get logs"
            sx={{
              color: "primary.main",
            }}
            onClick={handleSaveClick(id)}
          />,
        ]
      },
    },
  ]

  const handleSaveClick = id => () => {
    console.log("Get Logs for ", id)

    axios.get(URL+"?logs="+id).then(res => {
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
      setLogOutput("Get Logs for " + id + " \n\n"+ jsonData)
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

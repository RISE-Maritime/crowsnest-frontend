import React from "react"
import { Grid } from "@mui/material"
import ViewWindow from "./components/ViewWindow"

const windowURLs = [
  "http://localhost:8000/rise/seahorse/mediamtx/sh-1/compressed_image/axis-1",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-1/compressed_image/axis-2",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-1/compressed_image/axis-3",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-1/compressed_image/axis-4",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-2/compressed_image/axis-5",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-2/compressed_image/axis-6",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-2/compressed_image/axis-7",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-2/compressed_image/axis-8",
]

export default function Lookout360() {
  return (
    <Grid container>
      {windowURLs.map((url, index) => (
        <Grid item xs={3} key={"random_gegrg" + index}>
          <h1>Lookout 360</h1>
          <ViewWindow URLcam={url} />
        </Grid>
      ))}
    </Grid>
  )
}

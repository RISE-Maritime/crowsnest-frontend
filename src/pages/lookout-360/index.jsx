import React from "react"
import { Grid, Typography } from "@mui/material"

import CamRow4 from "./components/CamRow4"

const bowURLs = [
  "http://localhost:8000/rise/seahorse/mediamtx/sh-2/compressed_image/axis-7",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-2/compressed_image/axis-8",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-2/compressed_image/axis-6",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-2/compressed_image/axis-5",
]

const aftURLs = [
  "http://localhost:8000/rise/seahorse/mediamtx/sh-1/compressed_image/axis-1",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-1/compressed_image/axis-2",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-1/compressed_image/axis-3",
  "http://localhost:8000/rise/seahorse/mediamtx/sh-1/compressed_image/axis-4",
]

export default function Lookout360() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <CamRow4 bowURLs={bowURLs} title={"Bow"} />
      </Grid>

      <Grid item xs={12}>
        <CamRow4 bowURLs={aftURLs} title={"Aft"} />
      </Grid>
    </Grid>
  )
}

import React from "react"
import { Button, Stack } from "@mui/material"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { setPlatformAIS } from "../../../recoil/selectors"
import { atomPlatformsAIS, atomActivePlatform } from "../../../recoil/atoms"

export default function DefaultAisTargets({ aisFiltered }) {
  const setPlatform = useSetRecoilState(setPlatformAIS)
  const AISplatforms = useRecoilValue(atomPlatformsAIS)
  const activePlatform = useRecoilValue(atomActivePlatform)

  const isFound = mmsi => {
    const filteredArray = aisFiltered.filter(element => {
      if (element.mmsi === mmsi) {
        return true
      }
      return false
    })

    if (filteredArray.length > 0) {
      return false
    } else {
      return true
    }
  }

  return (
    <Stack spacing={1} direction="row">
      {AISplatforms.map(obj => {
        return (
          <Button
            key={obj.id}
            color="secondary"
            disabled={isFound(obj.mmsi)}
            // variant="outlined"
            variant={obj.mmsi == activePlatform.mmsi ? "contained" : "outlined"}
            size="small"
            onClick={() => setPlatform(obj)}
          >
            {obj.platformName}
          </Button>
        )
      })}
    </Stack>
  )
}

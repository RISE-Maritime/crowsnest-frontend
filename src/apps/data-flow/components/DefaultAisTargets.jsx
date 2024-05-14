import React from "react"
import { Stack } from "@mui/material"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"
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
            disabled={isFound(obj.mmsi)}
            variant="check"
            checked={obj.mmsi == activePlatform.mmsi}
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

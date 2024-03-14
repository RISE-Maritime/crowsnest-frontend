import React from "react"
import { Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"

import { ObcRichButton as RichButton } from "@oicl/openbridge-webcomponents-react/components/rich-button/rich-button"
import { Obi02ChevronRight as ChevronRightIcon } from "@oicl/openbridge-webcomponents-react/icons/icon-02-chevron-right"

export default function viewListItem(props) {
  const navigate = useNavigate()

  return (
    <Grid item xs={6}>
      <RichButton
        position="regular"
        size="multi-line"
        has-leading-icon={true}
        has-trailing-icon={true}
        onClick={() => navigate(props.routeLink)}
      >
        {props.icon}
        <div slot="label">{props.viewName}</div>
        {props.description && <div slot="description">{props.description}</div>}
        <ChevronRightIcon slot="trailing-icon" />
      </RichButton>
    </Grid>
  )
}

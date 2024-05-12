import React from 'react'
import { Button, Paper } from '@mui/material'
import { sailAction } from '../../../recoil/selectors'
import {  useSetRecoilState } from "recoil"

export default function SailControl() {

  const newSailAction = useSetRecoilState(sailAction)

  const makeQuery = () => {
    console.log("makeQuery")
    newSailAction({ "sail": 0, "angle": 45 })
  }


  return (
    <Paper>
      <Button onClick={makeQuery}>TEST BUTTON</Button>
    </Paper>
  )
}

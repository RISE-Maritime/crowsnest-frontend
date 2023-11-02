import React from "react"
import { Button, Stack } from "@mui/material"
import { ATOM_OS_COMMAND } from "../../../recoil/atoms"
import { useRecoilState } from "recoil"
export default function CommandBar() {
  const [command, setCommand] = useRecoilState(ATOM_OS_COMMAND)

  const handleRequestCommand = () => {
    console.log("Request GU command", !command.guiInCommand)

    setCommand({
      ...command,
      guiInCommand: !command.guiInCommand,
    })
  }

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
      <Button
        onClick={handleRequestCommand}
        variant="outlined"
        size="large"
        color={command.guiInCommand ? "success" : "secondary"}
      >
        {command.guiInCommand ? "IN command" : "Request command"}
      </Button>
    </Stack>
  )
}

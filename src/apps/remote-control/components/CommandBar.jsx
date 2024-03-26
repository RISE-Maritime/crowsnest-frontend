import React from "react"
import { Stack } from "@mui/material"
import { ATOM_OS_COMMAND } from "../../../recoil/atoms"
import { useRecoilState } from "recoil"
import { ObcButton as Button } from "@oicl/openbridge-webcomponents-react/components/button/button"

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
      <Button onClick={handleRequestCommand} variant="check" size="large" checked={command.guiInCommand}>
        {command.guiInCommand ? "In command" : "Request command"}
      </Button>
    </Stack>
  )
}

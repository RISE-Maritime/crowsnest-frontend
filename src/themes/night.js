import { experimental_extendTheme as extendTheme } from "@mui/material/styles"
import { componentOverrides } from "./common"

const nightTheme = extendTheme({
  cssVarPrefix: "",
  ...componentOverrides,

  colorSchemes: {
    light: {
      palette: {
        mode: "dark",
        primary: {
          main: "#2196f3",
          light: "#66bb77",
          contrastText: "#ffffff",
          port: "#E93629",
          starboard: "#1FB948",
        },
        secondary: {
          main: "#ed6432",
          dark: "#b84d27",
        },
        background: {
          default: "#333333",
        },
        error: {
          main: "#cb2e24",
        },
        warning: {
          main: "#eec937",
        },
        success: {
          main: "#11b014",
          contrastText: "#ffffff",
        },
        info: {
          main: "#2196f3",
        },
        text: {
          primary: "#fff",
        },
      },
    },
  },
})

export default nightTheme

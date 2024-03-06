import { experimental_extendTheme as extendTheme } from "@mui/material/styles"
import { componentOverrides } from "./common"

const duskTheme = extendTheme({
  cssVarPrefix: "",
  ...componentOverrides,
  colorSchemes: {
    light: {
      palette: {
        mode: "dark",
        shadows: {
          flat: "0 1px 1px rgba(0, 0, 0, 0.5)",
          raised: "0 2px 4px rgba(0, 0, 0, 0.5)",
          floating: "0 4px 16px rgba(0, 0, 0, 0.6)",
          overlay: "0 8px 32px rgba(0, 0, 0, 0.8)",
          //focused: "0 8px 32px rgba(0, 0, 0, 0.4)", // denna kanske är fel
        },
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
          default: "purple",
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
        //OpenBridge
        container: {
          "global-color": "#262626",
        },
        element: {
          "active-color": "#F2F2F2",
        },
        flat: {
          "enabled-background-color": "rgba(255, 255, 255, 0)",
          "enabled-border-color": "rgba(0, 0, 0, 0)",
        },
        onFlat: {
          "neutral-color": "rgba(255, 255, 255, 0.55)",
        },
      },
    },
  },
})

export default duskTheme

import { experimental_extendTheme as extendTheme } from "@mui/material/styles"
import { componentOverrides } from "./common"

const dayTheme = extendTheme({
  cssVarPrefix: "",

  shadows: {
    flat: "0 1px 1px rgba(0, 0, 0, 0.2)",
    raised: "0 2px 4px rgba(0, 0, 0, 0.2)",
    floating: "0 4px 16px rgba(0, 0, 0, 0.3)",
    overlay: "0 8px 32px rgba(0, 0, 0, 0.4)",
    focused: "0 8px 32px rgba(0, 0, 0, 0.4)", // denna kanske är fel
  },
  ...componentOverrides,
  colorSchemes: {
    light: {
      palette: {
        // mode: "light",
        primary: {
          main: "#1f2e47",
          light: "#66bb77",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#ed6432",
          contrast: "#33BBFF",
        },
        background: {
          default: "#e3e3e3",
        },
        error: {
          main: "#cb2e24",
        },
        warning: {
          main: "#eec937",
        },
        success: {
          main: "#14cc17",
        },
        info: {
          main: "#031e49",
        },
        //OpenBridge
        container: {
          "global-color": "#FCFCFC",
        },
        element: {
          "active-color": "#1A1A1A",
        },
        flat: {
          "enabled-background-color": "rgba(0, 0, 0, 0)",
          "enabled-border-color": "rgba(0, 0, 0, 0)",
        },
        onFlat: {
          "neutral-color": "rgba(0, 0, 0, 0.55)",
        },
      },
    },
  },
})

export default dayTheme

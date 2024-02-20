import { createTheme } from "@mui/material/styles"
const nightTheme = createTheme({
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
    //OpenBridge
    container: {
      "global-color": "#0a0a00",
    },
    element: {
      "active-color": "#474700",
    },
    flat: {
      "enabled-background-color": "rgba(255, 255, 255, 0)",
      "enabled-border-color": "rgba(0, 0, 0, 0)",
    },
    onFlat: {
      "neutral-color": "#333300",
    },
  },
})

export default nightTheme

import { createTheme } from "@mui/material/styles"
const brightTheme = createTheme({
  palette: {
    mode: "light",
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
      default: "hotpink",
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
  },
})

export default brightTheme

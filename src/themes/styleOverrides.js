export const componentOverrides = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "var(--container-backdrop-color)",
          color: "var(--element-active-color)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ size }) => ({
          borderRadius: 0,
          padding: size === "normal" ? "5px" : "0px",
          height: "48px",
          width: "48px",
        }),
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: "var(--element-active-color)",
          backgroundColor: "var(--container-background-color)",
        },
      },
    },
  },
}

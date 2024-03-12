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
    /*MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--enabled-background-color)",
          color: "var(--on-enabled-background-color)",
        },
      },
    },*/
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme, size }) => ({
          borderRadius: 0,
          padding: size === "normal" ? "5px" : "0px",
          height: "48px",
          width: "48px",
        }),
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 0,
        }),
      },
    },
  },
}

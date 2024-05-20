export const componentOverrides = {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "var(--container-backdrop-color)",
          color: "var(--element-active-color)",
          fontFamily: "Open Sans",
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
          border: "1px solid var(--border-outline-color)",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          color: "var(--element-active-color)",
          backgroundColor: "var(--normal-enabled-background-color)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: { color: "var(--element-neutral-color)" },
          helperText: { color: "var(--element-active-color)" },
          fontColor: "var(--element-active-color)",
          backgroundColor: "var(--normal-enabled-background-color)",

          "&$selected": {
            color: "white",
          },

          "&$success": {
            color: "white",
          },
          "&$error": {
            color: "white",
          },
          error: {
            color: "white",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "var(--element-active-color)",
        },
      },
    },
  },
}

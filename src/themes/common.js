export const componentOverrides = {
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.backgroundColor,
          color: theme.vars["element-active-color"],
          boxShadow: theme.shadows.raised,
        }),
      },
    },
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

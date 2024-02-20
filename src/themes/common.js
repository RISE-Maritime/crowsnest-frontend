const componentOverrides = {
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.container["global-color"],
          color: theme.palette.element["active-color"],
          boxShadow: theme.shadows.raised,
        }),
      },
    },
  },
}

export default componentOverrides

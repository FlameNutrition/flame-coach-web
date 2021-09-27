import { createTheme, colors } from "@material-ui/core";

import shadows from "./shadows";
import typography from "./typography";

const theme = createTheme({
  palette: {
    background: {
      dark: "#F4F6F8",
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[500]
    },
    secondary: {
      main: colors.indigo[500]
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    },
    button: {
      success: colors.green[300],
      warning: colors.yellow[500],
      dangerous: colors.red[300],
      neutral: colors.indigo[100]
    }
  },
  shadows,
  typography
});

export default theme;

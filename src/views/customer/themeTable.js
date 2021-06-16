import { createMuiTheme } from '@material-ui/core';

const themeTable = createMuiTheme({
  overrides: {
    MUIDataTable: {
    },
    MUIDataTableToolbar: {
      root: {
        paddingLeft: '16px'
      },
      titleText: {
        fontWeight: 500,
        fontSize: 16,
        letterSpacing: '-0.05px'
      }
    }
  }
});

export default themeTable;

// @flow

import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7C0081',
    },
    secondary: {
      main: '#c62828',
    },
    text: '#fff',
  },
  typography: {
    useNextVariants: true,
  },
  paper: {
    padding: '10px',
  },
  tableCell: {
    textAlign: 'center',
  },
  overrides: {
    MuiGrid: {
      container: {
        marginBottom: '30px',
      },
    },
    MuiPaper: {
      root: {
        marginTop: '20px',
        padding: '10px',
      },
    },
    MuiAppBar: {
      root: {
        padding: 0,
        margin: 0,
      },
    },
    MuiChip: {
      root: {
        marginLeft: '10px',
        height: '28px',
      },
      avatar: {
        height: '28px',
        width: '28px',
      },
    },
    MuiButton: {
      root: {
        minWidth: '60px',
      },
    },
    MuiSvgIcon: {
      root: {
        width: '0.8em',
        height: '0.8em',
      },
    },
    MuiListItem: {
      default: {
        paddingTop: '3px',
        paddingBottom: '3px',
      },
    },
  },
})
export default theme

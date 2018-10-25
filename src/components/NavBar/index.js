import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

type Props = {
  title?: string,
}

const NavBar = (props: Props) => (
  <div>
    <AppBar position="static" color="primary">
      <Toolbar color="inherit">
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" style={{ flex: 1 }}>
            {props.title || 'Rentoma'}
          </Typography>
          {props.children}
        </div>
      </Toolbar>
    </AppBar>
  </div>
)

export default NavBar

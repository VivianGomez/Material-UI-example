import React from 'react';
import {pink500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    textColor: pink500,
  },
  appBar: {
    height: 100,
    color: pink500
  },
});

// MuiThemeProvider takes the theme as a property and passed it down the hierarchy.
const Main = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <AppBar title="Search images / Material UI example" />
  </MuiThemeProvider>
);

export default Main;
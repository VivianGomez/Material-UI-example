import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Principal from './Components/Principal';
import {pink500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './App.css';

const muiTheme = getMuiTheme({
  palette: {
    textColor: pink500,
  },
  appBar: {
    height: 50,
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Navbar />
          <Principal />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
import React, { Component } from 'react';
import MapContainer from './mapContainer.js'
import HeaderContainer from './headerContainer.js'
import './App.css';

class App extends Component {
  toggleMenu = (clickEvent) => {
    console.log('coming in togglemenu')
  }
  render() {
    return (
      <div>
        <HeaderContainer menuClickHandler={this.toggleMenu}/>
        <MapContainer/>
      </div>
    );
  }
}

export default App;

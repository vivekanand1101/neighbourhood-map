import React, { Component } from 'react';
import MapContainer from './mapContainer.js'
import HeaderContainer from './headerContainer.js'
import ListPlacesContainer from './listContainer.js'
import {locations, initialLocation} from './location_data.js'
import './App.css';

class App extends Component {
  toggleMenu = (clickEvent) => {
    console.log('coming in togglemenu')
  }
  state = {
    locations: locations,
    initialLocation: initialLocation
  }
  filterLocations = (queryValue) => {
    const filteredLocations = locations.filter((location) => location.title.toUpperCase().indexOf(queryValue.toUpperCase()) > -1 )
    this.setState({
      locations: filteredLocations
    })
  }
  pickLocation = (location_title) => {
    const filteredLocation = locations.filter((location) => location.title.toUpperCase().indexOf(location_title.toUpperCase()) > -1 )
    this.setState({
      locations: filteredLocation
    })
  }
  resetLocation = () => {
    this.setState({
      locations: locations,
    })
  }
  render() {
    return (
      <div>
        <ListPlacesContainer locations={this.state.locations} updateLocations={this.filterLocations} pickLocation={this.pickLocation} resetLocations={this.resetLocation}/>
        <HeaderContainer menuClickHandler={this.toggleMenu}/>
        <MapContainer locations={this.state.locations} initialLocation={this.state.initialLocation} scaleControl={true}/>
      </div>
    );
  }
}

export default App;

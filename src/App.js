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
    initialLocation: initialLocation,
    activeMarker: null,
  }
  filterLocations = (queryValue) => {
    const filteredLocations = locations.filter((location) => location.title.toUpperCase().indexOf(queryValue.toUpperCase()) > -1 )
    this.setState({
      locations: filteredLocations,
    })
    if (filteredLocations.length !== 1) {
      this.setState({
        activeMarker: null
      })
    }
  }
  resetLocations = () => {
    this.setState({
      locations: locations,
      activeMarker: null,
    })
  }
  updateActiveMarker = (marker) => {
    this.setState({
      activeMarker: marker,
      locations: [marker.location]
    })
  }
  render() {
    return (
      <div>
        <ListPlacesContainer locations={this.state.locations} updateLocations={this.filterLocations} pickLocation={this.filterLocations} resetLocations={this.resetLocations}/>
        <HeaderContainer menuClickHandler={this.toggleMenu}/>
        <MapContainer locations={this.state.locations} initialLocation={this.state.initialLocation}
          scaleControl={true} resetLocations={this.resetLocations} updateActiveMarker={this.updateActiveMarker}
          activeMarker={this.state.activeMarker}
        />
      </div>
    );
  }
}

export default App;

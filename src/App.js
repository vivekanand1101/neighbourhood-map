import React, { Component } from 'react';
import MapContainer from './mapContainer.js'
import HeaderContainer from './headerContainer.js'
import ListPlacesContainer from './listContainer.js'
import {locations, initialLocation} from './location_data.js'
import './App.css';

class App extends Component {
  toggleMenu = (clickEvent) => {
    this.setState({
      showNav: !this.state.showNav
    })
  }
  state = {
    locations: locations,
    initialLocation: initialLocation,
    activeMarker: null,
    showNav: false,
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
        <HeaderContainer menuClickHandler={this.toggleMenu}/>
        <ListPlacesContainer locations={this.state.locations} updateLocations={this.filterLocations} 
          pickLocation={this.filterLocations} resetLocations={this.resetLocations}
          showNav={this.state.showNav}
        />
        <MapContainer locations={this.state.locations} initialLocation={this.state.initialLocation}
          scaleControl={true} resetLocations={this.resetLocations} updateActiveMarker={this.updateActiveMarker}
          activeMarker={this.state.activeMarker} showNav={this.state.showNav}
        />
      </div>
    );
  }
}

export default App;

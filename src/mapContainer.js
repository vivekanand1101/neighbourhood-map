import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import {locations, initialLocation} from './location_data.js'

export class MapContainer extends Component {
    state = {
        markers: [],
        activeMarker: null,
        showInfoWindow: false,
        selectedPlace: {},
    }
    componentDidMount = () => {
        this.addMarkers()
    }
    addMarkers = () => {
        this.setState({
            markers: locations,
        })
    }
    markerClicked = (props, marker, _event) => {
        this.setState({
            activeMarker: marker,
            showInfoWindow: true,
            selectedPlace: props,
        })
    }
    render() {
        return (
            <Map google={this.props.google} zoom={11} initialCenter={initialLocation} style={{height: '100%', position: 'relative', width: '100%' }}>
                {this.state.markers.map((location, idx) => <Marker key={idx} name={location.title} onClick={this.markerClicked} position={location.position}/>)}
                {this.state.activeMarker && 
                <InfoWindow onClose={this.onInfoWindowClose} marker={this.state.activeMarker} visible={this.state.showInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
                }
            </Map>
        )
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDyMGsAe9BjxU2No7KuXTIprXNZmsTUb9w')
})(MapContainer)

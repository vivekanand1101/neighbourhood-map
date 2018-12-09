import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const foursquare = require('react-foursquare')({
    clientID: 'SKPZ4WZ4GHSVRVKFAP2BTIH0QDJKL5NUWHHFWJ0UMWWIM5KE',
    clientSecret: 'U5XMXZP0TAS5ISTZY5HVHQDAVCJEZV2K2HCN0LJTOGVEIC5Q'  
});


export class MapContainer extends Component {
    state = {
        markers: [],
        activeMarker: null,
        showInfoWindow: false,
        selectedPlace: {},
        markerAnimation: null,
    }
    componentDidMount = () => {
        this.addMarkers()
    }
    componentWillReceiveProps = (newProps) => {
        if (newProps.locations !== this.state.markers) {
            this.setState({
                markers: newProps.locations,
                markerAnimation: null,
            })
            if (newProps.locations.length === 1) {
                this.setState({
                    markerAnimation: newProps.google.maps.Animation.BOUNCE,
                    showInfoWindow: true,
                    selectedPlace: newProps,
                    // activeMarker: newProps.locations[0],
                    markers: newProps.locations,
                })
            }
        }
    }
    addMarkers = () => {
        this.setState({
            markers: this.props.locations,
        })
    }
    markerClicked = (props, marker, _event) => {
        this.setState({
            activeMarker: marker,
            showInfoWindow: true,
            selectedPlace: props,
            markerAnimation: props.google.maps.Animation.BOUNCE,
            markers: [marker]
        })
        // this.onInfoOpen()
    }

    onInfoOpen = () => {
        const query = this.state.selectedPlace.name 
        const params = {
            'll': `${this.state.selectedPlace.position.lat},${this.state.selectedPlace.position.lng}`,
            'query': query
        }
        foursquare.venues.suggestCompletion(params)
            .then(res => {
                const venues = res.response.minivenues
                if (venues.length >= 1) {
                    const firstVenue = venues[0].location
                    if (firstVenue !== undefined) {
                        return firstVenue.address
                    }
                }
                return this.state.selectedPlace.name
            })
    }

    render() {
        return (
            <Map google={this.props.google} zoom={11} initialCenter={this.props.initialLocation} style={{height: '100%', position: 'relative', width: '100%' }}>
                {this.state.markers.map((location, idx) => <Marker key={idx} name={location.title} onClick={this.markerClicked} position={location.position} animation={this.state.markerAnimation}/>)}
                {this.state.activeMarker &&
                <InfoWindow onClose={this.onInfoWindowClose} marker={this.state.activeMarker} visible={this.state.showInfoWindow}>
                    <div>
                        <h1>{this.onInfoOpen()}</h1>
                        <h1>wtfbors</h1>
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

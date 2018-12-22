import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const foursquare = require('react-foursquare')({
    clientID: 'SKPZ4WZ4GHSVRVKFAP2BTIH0QDJKL5NUWHHFWJ0UMWWIM5KE',
    clientSecret: 'U5XMXZP0TAS5ISTZY5HVHQDAVCJEZV2K2HCN0LJTOGVEIC5Q'  
});


export class MapContainer extends Component {
    state = {
        markers: [],
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
            showInfoWindow: true,
            selectedPlace: props,
            markerAnimation: props.google.maps.Animation.BOUNCE,
            markers: [marker]
        })
        if (this.props.updateActiveMarker) {
            this.props.updateActiveMarker(marker)
        }
    }

    onInfoWindowOpen = (activeMarker) => {
        const query = activeMarker.name
        const lat = activeMarker.position.lat()
        const lng = activeMarker.position.lng()
        const params = {
            'll': `${lat},${lng}`,
            'query': query
        }
        let out = query
        foursquare.venues.suggestCompletion(params)
            .then(res => {
                const infoElement = document.getElementById("info-window")
                const venues = res.response.minivenues
                if (venues.length >= 1) {
                    const firstVenue = venues[0].location
                    if (firstVenue !== undefined) {
                        out = firstVenue.address
                    }
                }
                infoElement.textContent = out
            })
    }

    onInfoWindowClose = () => {
        if (this.props.resetLocations) {
            this.props.resetLocations()
        }
    }

    onMapClicked = () => {
        this.onInfoWindowClose()
    }

    render() {
        const activeMarker = this.props.activeMarker
        let navClassName = "map-container"
        if (this.props.showNav) {
            navClassName = `${navClassName} adjust-map`
        }
        return (
            <div className={navClassName}>
                <Map google={this.props.google} zoom={11} initialCenter={this.props.initialLocation} style={{height: '100%', position: 'relative', width: '100%' }}
                onClick={this.onMapClicked}
                >
                    {this.state.markers.map((location, idx) => <Marker key={idx} name={location.title} onClick={this.markerClicked} location={location} position={location.position} animation={this.state.markerAnimation}/>)}
                    {activeMarker &&
                    // <InfoWindow onClose={this.onInfoWindowClose} marker={activeMarker} visible={true} onOpen={this.onInfoWindowOpen(activeMarker)}>
                    <InfoWindow onClose={this.onInfoWindowClose} marker={activeMarker} visible={this.state.showInfoWindow}>
                        <div>
                            <p id="info-window">Bc pata nhi kya ho raha hai</p>
                            {/* {this.onInfoWindowOpen(activeMarker)} */}
                        </div>
                    </InfoWindow>
                    }
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDyMGsAe9BjxU2No7KuXTIprXNZmsTUb9w')
})(MapContainer)

import React, { Component } from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


const foursquare = require('react-foursquare')({
    clientID: 'SKPZ4WZ4GHSVRVKFAP2BTIH0QDJKL5NUWHHFWJ0UMWWIM5KE',
    clientSecret: 'U5XMXZP0TAS5ISTZY5HVHQDAVCJEZV2K2HCN0LJTOGVEIC5Q'  
});


export class MapContainer extends Component {
    state = {
        markers: [],
        markerAnimation: null,
        activeMarker: null,
        infoWindowContent: 'Loading...',
    }
    componentDidMount = () => {
        this.addMarkers()
    }
    componentWillReceiveProps = (newProps) => {
        if (newProps.locations !== this.state.markers) {
            this.setState({
                markers: newProps.locations,
            })
            if (newProps.locations.length === 1) {
                const activeLocation = this.props.locations[0]
                const activeMarker = <Marker name={activeLocation.title} onClick={this.markerClicked} location={activeLocation}
                                                position={activeLocation.position} animation={newProps.google.maps.Animation.BOUNCE}/>
                this.setState({
                    activeMarker: activeMarker
                })
            }
        }
    }
    addMarkers = () => {
        this.setState({
            markers: this.props.locations,
        })
        if (this.props.locations.length === 1) {
            const activeLocation = this.props.locations[0]
            const activeMarker = <Marker name={activeLocation.title} onClick={this.markerClicked} location={activeLocation}
                                            position={activeLocation.position} animation={this.props.google.maps.Animation.BOUNCE}/>
            this.setState({
                activeMarker: activeMarker,
            })
        }
    }
    markerClicked = (props, marker, _event) => {
        this.setState({
            markers: [marker.location],
            activeMarker: marker,
        })
        this.onInfoWindowOpen()
    }

    onInfoWindowOpen = () => {
        let activeMarker = this.state.activeMarker
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
                if (res.meta.code !== 200) {
                    this.setState({
                        infoWindowContent: 'FourSquare data not available'
                    })
                }
                const venues = res.response.minivenues
                if (venues.length >= 1) {
                    const firstVenue = venues[0].location
                    if (firstVenue !== undefined && firstVenue !== '') {
                        out = firstVenue.address
                    }
                }
                this.setState({
                    infoWindowContent: out
                })
            }).catch(res => {
                this.setState({
                    infoWindowContent: 'Foursqare api failure'
                })
            })
    }

    onInfoWindowClose = () => {
        this.setState({
            activeMarker: null,
            markerAnimation: null,
            infoWindowContent: 'Loading...',
        })
        if (this.props.resetLocations) {
            this.props.resetLocations()
        }
    }

    onMapClicked = () => {
        this.onInfoWindowClose()
    }

    render() {
        let navClassName = "map-container"
        if (this.props.showNav) {
            navClassName = `${navClassName} adjust-map`
        }
        let animation = null
        let showInfoWindow = false
        if (this.state.activeMarker) {
            animation = this.props.google.maps.Animation.BOUNCE
            showInfoWindow = true
        }
        return (
            <div className={navClassName}>
                <Map google={this.props.google} zoom={11} initialCenter={this.props.initialLocation} style={{height: '100%', position: 'relative', width: '100%' }}
                onClick={this.onMapClicked}>
                    {this.state.markers.length > 0 &&
                        this.state.markers.map(
                            (location, idx) => <Marker key={idx} name={location.title} onClick={this.markerClicked} location={location}
                                                position={location.position} animation={animation}/>)
                    }
                    {this.state.activeMarker &&
                    <InfoWindow onClose={this.onInfoWindowClose} marker={this.state.activeMarker} visible={showInfoWindow} onOpen={this.onInfoWindowOpen}>
                        <div>
                            <h3 id="info-window">
                            {this.state.activeMarker.name}
                            </h3>
                            <p className="info-window-para">
                            <strong>Address from FourSquare: </strong>{this.state.infoWindowContent}
                            </p>
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


import React, { Component } from 'react';


class ListPlacesContainer extends Component {
    state = {
        query: '',
    }
    onQueryUpdate = (event) => {
        const queryValue = event.target.value.trim()
        this.setState({
            query: queryValue
        })
        if (this.props.updateLocations) {
            this.props.updateLocations(queryValue)
        }
    }
    onLocationClick = (event) => {
        if (this.props.pickLocation) {
            this.props.pickLocation(event.target.innerHTML)
        }
    }
    resetLocations = () => {
        if (this.props.resetLocations) {
            this.props.resetLocations()
        }
    }
    render() {
        const locations = this.props.locations
        return (
            <div className="locations-list-container">
                <div className="filter-box">
                    <input type="text" placeholder="Filter locations" value={this.state.query} onChange={this.onQueryUpdate}></input>
                    <button className="reset-button" onClick={this.resetLocations}>Reset</button>
                </div>
                <ul className="places-list">
                    {locations.map((location, index) => <li key={index} className="places-list-item" onClick={this.onLocationClick}>{location.title}</li>)}
                </ul>
            </div>
        )
    }
}

export default ListPlacesContainer

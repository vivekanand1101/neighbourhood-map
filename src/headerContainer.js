import React, { Component } from 'react';


class HeaderContainer extends Component {
    onHamburgerClick = (event) => {
        if (this.props.menuClickHandler) {
            this.props.menuClickHandler()
        }
    }
    render() {
        return(
            <div className="neighbourhood-header">
                <div className="hamburger-father" onClick={this.onHamburgerClick}>
                    <div className="hamburger-menu"></div>
                    <div className="hamburger-menu"></div>
                    <div className="hamburger-menu"></div>
                </div>
                <h1 className="neighbourhood-h">Neighbourhood Bars</h1>
            </div>
        )
    }
}

export default HeaderContainer

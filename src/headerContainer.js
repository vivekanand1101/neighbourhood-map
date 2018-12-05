import React, { Component } from 'react';


class HeaderContainer extends Component {
    onHamburgerClick = (event) => {
        console.log("coming in this after:" + event.target)
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
                <p className="neighbourhood-p">Neighbourhood Bars</p>
            </div>
        )
    }
}

export default HeaderContainer

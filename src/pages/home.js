/**
 * Created by 12072 on 20/03/17.
 */
import React, { Component } from 'react';
import './home.css';

import Matches from './Matches';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            side: true
        };

        this.toggleSide = this.toggleSide.bind(this);
    }

    toggleSide() {
        this.setState({
            side: !this.state.side
        })
    }

    render() {
        const sideBar = this.state.side ? 'open' : 'hide';
        return (
            <div className={`container ${sideBar}`}>
                <div className={`side-bar ${sideBar}`}>
                    <Matches />
                </div>
                <div className="header">
                    <div className="toggle">
                        <button className="toggle-btn" onClick={this.toggleSide}>
                            <i className="fa fa-bars"></i>
                        </button>
                    </div>
                </div>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="footer">
                    footer
                </div>
            </div>
        );
    }
}

export default Home;

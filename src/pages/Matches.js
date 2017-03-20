/**
 * Created by 12072 on 20/03/17.
 */
import React, { Component } from 'react';
const Request = require('superagent');
import './matches.css';
import { Link } from 'react-router';

class Matches extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            matches: [],
            loading: false
        }
    }

    componentDidMount() {
        Request('/matches', (error, result, body) => {
            if(!error) {
                this.setState({
                    matches: result.body ? result.body.data : []
                })
            }
        })
    }

    render() {
        console.log(this.state.matches)
        return (
            <div className={'matches'}>
                {
                    this.state.matches.map(item => {
                        return (
                            <Item key={item.unique_id} {...item}/>
                        )
                    })
                }
            </div>
        );
    }
}

class Item extends Component {

    render() {
        return (
            <div className={'item'}>
                <Link to={`/scoreboard/${this.props.unique_id}`} style={[ { color: 'white' } ]}>{this.props.title}</Link>
            </div>
        )
    }
}

export default Matches;

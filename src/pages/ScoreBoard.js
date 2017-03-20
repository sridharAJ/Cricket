/**
 * Created by 12072 on 20/03/17.
 */
import React, { Component } from 'react';
const Request = require('superagent');
import './table.css';

class ScoreBoard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            batting: this.getCachedData(props)
        }
    }

    getCachedData(props) {
        let batting = [];
        const url = this.getScoreURL(props);
        try {
            if (typeof window.localStorage !== "undefined") {
                batting = JSON.parse(localStorage.getItem(url)) || []
            }
        }catch(e) {
        }
        return batting;
    }

    getScoreURL(props) {
        const { params } = props;
        const url = `/score/${params.id}`;
        return url;
    }

    makeApi(props) {
        const url = this.getScoreURL(props);
        Request(url, (error, result, body) => {
            if(!error) {
                const body = result.body;
                const batting = body.data ? body.data.batting : [];
                if (typeof window.localStorage !== "undefined") {
                    localStorage.setItem(url, JSON.stringify(batting));
                }
                this.setState({
                    batting
                })
            }
        })
    }

    startAutoRefresh() {
        setInterval(() => {
            this.makeApi(this.props)
        }, 20000)
    }

    componentDidMount() {
        this.startAutoRefresh();
        const cachedData = this.getCachedData(this.props);
        if(!cachedData) {
            this.makeApi(this.props)
        }
    }

    componentWillReceiveProps(nextProps) {

        if(this.getScoreURL(nextProps) !== this.getScoreURL(this.props)) {
            this.makeApi(nextProps)
        }
    }

    render() {
        return (
            <div className={'scoreboard'}>
                {
                    this.state.batting.map(bat => {
                        return (
                            <Table key={bat.title} {...bat} />
                        )
                    })
                }
            </div>
        );
    }
}

class Table extends Component {

    render() {
        return (
            <div className={'scoreboard'}>
                <div className="title">{this.props.title}</div>
                <div className="table-container">
                    <div className="thead">
                        <div className="row">
                            <div className="row-item" style={{width: 300}}>Name</div>
                            <div className="row-item">R</div>
                            <div className="row-item">B</div>
                            <div className="row-item">4s</div>
                            <div className="row-item">6s</div>
                            <div className="row-item">SR</div>
                        </div>
                    </div>
                    <div className="tbody">
                    {
                        this.props.scores.map((batsman, index )=> {
                            console.log('batsman',batsman)
                            return (
                                <Row key={batsman.batsman+batsman.pid} {...batsman}/>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }
}

class Row extends Component {


    constructor(props) {
        super(props)
        this.handlePlayer = this.handlePlayer.bind(this);
    }

    handlePlayer(e) {
        console.log(e);
    }

    render() {
        return (
            <div className={'row'}>
                <div className="row-item" style={{width: 300}}>
                    <span>
                        <a onClick={this.handlePlayer}>{this.props.batsman}</a>
                    </span>
                    <span className="dismissal-info">
                        {this.props['dismissal-info']}
                    </span>
                </div>
                <div className="row-item">{this.props.R}</div>
                <div className="row-item">{this.props.B}</div>
                <div className="row-item">{this.props['4s']}</div>
                <div className="row-item">{this.props['6s']}</div>
                <div className="row-item">{this.props['SR']}</div>
            </div>
        )
    }
}

export default ScoreBoard;

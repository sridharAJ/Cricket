import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import AppRoutes from './routes';

ReactDOM.render(
    <Router history={browserHistory} routes={AppRoutes} />,
    document.getElementById('root')
);

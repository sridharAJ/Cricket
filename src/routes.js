/**
 * Created by 12072 on 20/03/17.
 */
import React from 'react';
import { Route } from 'react-router';
import Home from './pages/home';
import ScoreBoard from './pages/ScoreBoard';

const AppRoutes = (
    <Route path='/' component={Home}>
        <Route path='scoreboard/:id' component={ScoreBoard}/>
    </Route>
);

export default AppRoutes;
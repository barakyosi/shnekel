import React, { Component } from 'react';
import { BrowserRouter , Route } from 'react-router-dom';
import CreateExpense from '../expenses/CreateExpense';

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={() => <div>HOME</div>} />
                <Route path="/new" component={CreateExpense} />
            </BrowserRouter>
        );
    }
}

export default Router;

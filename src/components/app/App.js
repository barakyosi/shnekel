import React, { Component } from 'react';
import Header from '../header/Header'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter, Route } from 'react-router-dom';
import CreateExpense from '../expenses/CreateExpense';
import ExpensesList from '../expenses/ExpensesList';
import CategoriesList from '../expenses/CategoriesList';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className="App__main">
                            <Header />
                            <Route exact path="/" component={ExpensesList} />
                            <Route exact path="/categories" component={CategoriesList} />
                            <Route path="/new" component={CreateExpense} />
                        </div>
                    </MuiPickersUtilsProvider>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

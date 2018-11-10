import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Tab.css';

export default function Tab({ label, to, activeOnlyWhenExact }) {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => (
                <div className={match ? "Tab Tab__active" : "Tab"}>
                    <Link to={to}>{label}</Link>
                </div>
            )}
        />
    );
}

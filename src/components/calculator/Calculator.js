import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../../helpers/calculator/calculate";
import "./App.css";

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: null,
            next: null,
            operation: null,
        };
    }

    handleClick = buttonName => {
        this.setState(calculate(this.state, buttonName));
    };

    render() {
        return (
            <div className="Calculator">
                <Display value={this.state.next || this.state.total || "0"} />
                <ButtonPanel clickHandler={this.handleClick} />
            </div>
        );
    }
}
export default Calculator;
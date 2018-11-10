import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

class Button extends React.Component {
    handleClick = () => {
        this.props.clickHandler(this.props.name);
    };

    render() {
        const className = [
            "Button",
            this.props.orange ? "Button--orange" : "",
            this.props.wide ? "Button--wide" : "",
        ];

        return (
            <div className={className.join(" ").trim()}>
                <button onClick={this.handleClick}>{this.props.name}</button>
            </div>
        );
    }
}
Button.propTypes = {
    name: PropTypes.string,
    orange: PropTypes.bool,
    wide: PropTypes.bool,
    clickHandler: PropTypes.func,
};
export default Button;
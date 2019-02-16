import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Person.module.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props)
        // This is the more modern approach
        this.inputElementRef = React.createRef();
    }

    componentDidMount() {
        // First way Max did it
        // this.inputElement.focus();
        // second way
        this.inputElementRef.current.focus();
    }

    render () {
        console.log('[Person.js] rendering', this.props);
        return (
            <Aux>
                <AuthContext.Consumer>
                    {(context) =>
                        context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>
                    }
                </AuthContext.Consumer>
                <p key="1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old</p>,
                <p key="2">{this.props.children}</p>,
                <input
                    key="3"
                    // First way Max did it. Older approach
                    // ref={(inputEl) => {this.inputElement = inputEl}}
                    // second way
                    ref={this.inputElementRef}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
        );
    };
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, styles.Person);
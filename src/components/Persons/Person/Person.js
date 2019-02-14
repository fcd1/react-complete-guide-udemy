import React, { Component, Fragment } from 'react';
import styles from './Person.module.css';

class Person extends Component {
    render () {
        console.log('[Person.js] rendering', this.props);
        return (
            <Fragment>
                <p key="1" onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old</p>,
                <p key="2">{this.props.children}</p>,
                <input key="3" type="text" onChange={this.props.changed} value={this.props.name} />
            </Fragment>
        );
    };
}


export default Person;
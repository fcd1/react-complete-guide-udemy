import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
    static getDreivedStateFromProps(props, state) {
        console.log('[Persons.js] getDreviedStateFromProps');
        return state;
    }

    shouldComponentUpdate(props, state) {
        console.log('[Persons.js] shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return { message: 'Snapshot!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdated');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render () {
        console.log('[Persons.js] rendering...');
        return this.props.persons.map(
            (person, index) => {
                return  <Person
                    click={() => this.props.clicked(index)}
                    name={person.name}
                    age={person.age}
                    key={person.id}
                    changed={(event) => this.props.changed(event, person.id)}
                />
            }
        );
    }
 }

export default Persons;
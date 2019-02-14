import React, { Component } from 'react';
// import './App.css';
import styles from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js constructor');
  }

  state = {
    persons: [
      { id: 1, name: 'Max', age: 28},
      { id: 2, name: 'Manu', age: 29},
      { id: 3, name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  // Legacy method, rarely used, may be removed in the future
  // Generates warning, mentions getDerivedStateFFromProps being used
  componentWillMount() {
    console.log('[App.js] componentWillMount');
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  // event arg will be passed in automatically by React
  nameChangeHandler =
    (event, id) =>
    {
      const personIndex =
        this.state.persons.findIndex(p => {
          return p.id === id;
          }
        );

      // Make a copy of the person object
      const person = {
        ...this.state.persons[personIndex]
      };

      person.name = event.target.value;

      const persons = [...this.state.persons];
      persons[personIndex] = person;
      this.setState( {persons: persons});
    }

  deletePersonHandler = (personIndex) => {
    // NOTE: Old code had the following:
    // const persons = this.state.persons
    // However, that means that, when we do the splice,
    // we will be splicing the array directly within the state,
    // which can lead to weirdness. Instead, make a copy of it and
    // change the copy. See Sec 4, Lec 55
    // Always update state in an immutable fashion:
    // Make a copy, update that, then use setState

    // Calling slice without any arguments
    // is a way to copy the array.
    // const persons = this.state.persons.slice();
    // Can also use the spread operator
    // this is the more modern way to do it
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    console.log('[App.js] render');
    // Preferred way of outputing content conditionaly
    let persons = null;
    if (this.state.showPersons) {
      persons = <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler} />;
    }

    // let classes = ['red', 'bold'].join(' ');



    return (
      <div className={styles.App}>
        <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }
}

export default App;

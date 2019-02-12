import React, { Component } from 'react';
// import './App.css';
import styles from './App.module.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Max', age: 28},
      { id: 2, name: 'Manu', age: 29},
      { id: 3, name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
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
    // Preferred way of outputing content conditionaly
    let persons = null;
    let btnClass = '';
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map(
            (person, index) => {
              return <Person
                        click={() => this.deletePersonHandler(index)}
                        name={person.name}
                        age={person.age}
                        // key helps react figure out which element is a list needs to be updated when refeshing DOM
                        // will get rid of following warning we have been getting:
                        // Warning: Each child in a list should have a unique "key" prop.
                        key={person.id}
                        changed={(event) => this.nameChangeHandler(event, person.id)}
                      />
            }
          )}
        </div>
      );
      btnClass = styles.Red;
    }

    // let classes = ['red', 'bold'].join(' ');

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push(styles.red);
    }
    if (this.state.persons.length <= 1) {
      classes.push(styles.bold);
    }

    return (
      <div className={styles.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}
        >
          Toggle Persons
        </button>
        {persons}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 29},
      {name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value'
  }

  switchNameHandler = (newName) => {
    // console.log('Was Clicked');
    // DON'T DO THIS: this.state.persons[0].name = 'Maxi';
    this.setState({
      persons: [
        {name: newName, age: 28},
        {name: 'Manu', age: 29},
        {name: 'Stephanie', age: 27}
      ]
    });
  }

  // event arg will be passed in automatically by React
  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        {name: 'Max', age: 28},
        {name: event.target.value, age: 29},
        {name: 'Stephanie', age: 27}
      ]
    });
  }
  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        { 
          /* One way to pass argumentss()
          However, Max said this can be ineffecient: Re-render things too often.
          He recomments the other way (bind syntax shown below)
          */
        }
        <button
          onClick={() => this.switchNameHandler('MaxiButton')}
          style={style}
        >
          Switch Name
        </button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        >
          <em>Hello</em>
        </Person>
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          // Other way to pass argument(s)
          click={this.switchNameHandler.bind(this,'MaxiParagraph')}
          // event arg passed in automatically by React
          changed={this.nameChangeHandler}
        >
          Hobbies: Racing
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        >
        </Person>
      </div>
    );
  }
}

export default App;

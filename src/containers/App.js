import React, { Component } from 'react';
import classes from './App.css';
import Persons from './../components/Persons/Persons';
import Cockpit from './../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/_Aux'

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor')
  }

  state = {
    persons: [
      { id: 'grcadfc3', name: 'Max', age: 28 },
      { id: 'axd32x',  name: 'Manu', age: 29 },
      { id: 'nsd223s1',  name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }
  // componentWillMount() {
  //   console.log('[App.js] componentWillMount')
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons})
  }

  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;
    // const person = Object.assign({}, this.state.persons[perosIndex])
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState((prevState, props) => {
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter + 1 
      };
    }) ;
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }

  render () {
    console.log('[App.js] render');

    let persons = null; 
    if (this.state.showPersons) {
      persons = <Persons 
          personsLength={this.state.persons.length}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          persons={this.state.persons}
          />
    }

    return (
      <Aux>
        <button 
        onClick={() => {
            this.setState({showCockpit:false})
          }}>
          Remove Cockpit
        </button>
        {this.state.showCockpit ? (
         <Cockpit 
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
        /> 
        ) : null}
        {persons}
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: [], description: '', date: ''}
  }

  inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
    
  }

  addTodo = (event) => {
    event.preventDefault();
    this.setState({
      todos: [...this.state.todos, {desc: this.state.description, date: this.state.date}]
    });
    
  }
  
  deleteTodo = (event) => {
      event.preventDefault();
      this.setState({
        todos: [delete this.state.todos.filter((item, index) => item !== index)]
      });
  }

  render() {
    const itemRows = this.state.todos.map((item, index) =>
        <tr key={index}>
        <td>{item.desc}</td>
        <td>{item.date}</td>
        <td><input type="submit" id={index} onSubmit={this.deleteTodo} value="Delete"/></td>
        </tr>
    )

    return (
      <div className="App">
        <div className="App-header">
          <h2>Simple Todolist</h2>
        </div>
        <br />
        <div>
          <form onSubmit={this.addTodo}>
            <fieldset>
            <legend align="left">Add to do item:</legend>
            <p>Description:
            <input type="text" name="description" onChange={this.inputChanged} value={this.state.description}/>
            Date:
            <input type="date" name="date" onChange={this.inputChanged} value={this.state.date}/>
            <input type="submit" value="Add"/>
            </p>
            </fieldset>
          </form>
        </div>
          <div>
            <table align="center"><tbody>
            <tr><th>Description</th><th>Date</th><th>Delete</th></tr>
            {itemRows}
            </tbody>    
            </table>
          </div>
      </div>
    );
  }
}

export default App;

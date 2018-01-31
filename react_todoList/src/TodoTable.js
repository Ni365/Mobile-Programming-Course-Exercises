import React, { Component } from 'react';
import './App.css';

class TodoTable extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        return (
            <div className="App">
            <table>
            <tbody>
            <tr><th>Description</th><th>Date</th></tr>
             {this.props.todos.map((item, index) =>
                <tr key={index}>
                <td>{item.desc}</td>
                <td>{item.date}</td>
                <td><button onClick={this.props.deleteTodo} id={index}>Delete</button></td></tr>
            )}  
            </tbody>
            </table>
            </div>
            )
    }
}

export default TodoTable;
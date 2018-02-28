import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './App.css';

class TodoTable extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        
        const columns = [{
            Header: 'Date',
            accessor: 'date',
        }, {
            Header: 'Description',
            accessor: 'desc',
        }]
        
        return (
            <div className="App">
            {/* new 3rd party React Table list */}
            <ReactTable data={this.props.todos}
                columns={columns} sortable='true'
                defaultPageSize='10' />
            {/*       // Original list with delete button
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
            </table> */ }
            </div>
            )
    }
}

export default TodoTable;
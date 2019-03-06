import React, { Component } from 'react';
import './Todo.css';
import Todo from './Todo'

// created class component with constructor with props to pass attributes

class ToDoList extends Component {
    constructor(props) {
        super(props);


        // set the state equal to an array
        this.state = {
            items: []
        };

    }

    //Didn't have to bind b/c of arrow function
    markCompleted = (id) => {
        //copy the items array 
        const items = this.state.items.slice();

        for (let item of items) {
            if (item.key === id) {
                //ternary operator/condition? if true: if false.. mark and unmark completed todo
                item.completed = item.completed ? false : true;

            }

        }
        this.setState({ items })
    }


    addItem = (e) => {
        if (this._inputElement.value !== "") {
            let index = this.state.items.length

            let newItem = {
                text: this._inputElement.value,
                key: Date.now(),    //added key prop to array 
                completed: false,
                index: index

            };
            this.setState((prevState) => {
                return {
                    // combining the two arrays
                    items: prevState.items.concat(newItem)  
                };
            });
        }
        this._inputElement.value = "";
        // preventing defalut action for for submit 
        e.preventDefault();
    }

    deleteItem = () => {
        let filteredItems = this.state.items.filter(function (item) {

            return (item.completed !== true)
        });

        this.setState({
            items: filteredItems
        });
    }
   

    render() {
     

        return (
            <div className="todoListMain">
                <div className='header'>
                    <form onSubmit={this.addItem} >
                        <input ref={(a) => this._inputElement = a}
                            placeholder="Enter ToDo item">
                        </input>
                        <button type="submit" >Add ToDo</button>
                        <button onClick={this.deleteItem}>Clear Completed</button>
                    </form>
                </div>
                <Todo entries={this.state.items}
                    delete={this.deleteItem}
                    markCompleted={this.markCompleted} />
            </div>
        );
    }
}

export default ToDoList;

import React, { Component } from 'react';


// created class component with constructor with props to pass attributes

class ToDoList extends Component {
    constructor(props) {
        super(props);


        // set the state equal to an array
        this.state = {
            items: []
        };

    }
   

    render() {
     

        return (
            <div className="todoListMain">
                <div className='header'>
                    <form >
                        <input 
                            placeholder="Enter ToDo item">
                        </input>
                        <button type="submit" >Add ToDo</button>
                        <button>Clear Completed</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default ToDoList;

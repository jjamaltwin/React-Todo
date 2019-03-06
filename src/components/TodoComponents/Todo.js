import React, {Component} from "react";
import './Todo.css';

    class Todo extends Component {
        constructor(props) {
            super(props);
            
            
        }

        //  Did not have to bind b/c of use of arrow function
       createTasks = (item) => { 
           return <li className = {item.completed ? "completed" : "uncompleted"} onClick= {() => this.props.markCompleted(item.key)} 
                    key={item.key}>{item.text}</li>         
       }

       delete(key) {
           this.props.delete(key);
       }

       render() {
           let todoEntries = this.props.entries;
           let listItems = todoEntries.map(this.createTasks);

            return (
                <ul className="theList">
                    {listItems}
                </ul>
            );
       }
    }

export default Todo; 
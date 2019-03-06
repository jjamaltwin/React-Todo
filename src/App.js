import React from 'react';
import ToDoList from './components/TodoComponents/TodoList';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      completed: 'false'
    };  
}
render() {
  

    return (
      <div>
      <ToDoList/>
      </div>
    );
  }
}

export default App;

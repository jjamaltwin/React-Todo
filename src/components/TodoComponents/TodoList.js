import React, { Component } from 'react';
import './Todo.css';
import Todo from './Todo'

// created class component with constructor and props to pass attributes
 

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

     autocomplete = (inp, items) => {
       
        let currentFocus;
        
        inp.addEventListener("input", function(e) {
            var a, b, i, val = this.value;
           
            closeAllLists();
            if (!val) { return false;}
            currentFocus = -1;
           
            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
           
            this.parentNode.appendChild(a);
           
            for (i = 0; i < items.length; i++) {
              
              if (items[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                
                b = document.createElement("DIV");
             
                b.innerHTML = "<strong>" + items[i].substr(0, val.length) + "</strong>";
                b.innerHTML += items[i].substr(val.length);
               
                b.innerHTML += "<input type='hidden' value='" + items[i] + "'>";
                
                    b.addEventListener("click", function(e) {
                 
                    inp.value = this.getElementsByTagName("input")[0].value;
                    
                    closeAllLists();
                });
                a.appendChild(b);
              }
            }
        });
        
        inp.addEventListener("keydown", function(e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode === 40) {
           
              currentFocus++;
              
              addActive(x);
            } else if (e.keyCode === 38) { 
              currentFocus--;
              
              addActive(x);
            } else if (e.keyCode === 13) {
              
              e.preventDefault();
              if (currentFocus > -1) {
               
                if (x) x[currentFocus].click();
              }
            }
        });
        function addActive(x) {
          
          if (!x) return false;
          
          removeActive(x);
          if (currentFocus >= x.length) currentFocus = 0;
          if (currentFocus < 0) currentFocus = (x.length - 1);
          
          x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
          
          for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
          }
        }
        function closeAllLists(elmnt) {
        
          var x = document.getElementsByClassName("autocomplete-items");
          for (var i = 0; i < x.length; i++) {
            if (elmnt !== x[i] && elmnt !== inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      
      document.addEventListener("click", function (e) {
          closeAllLists(e.target);
      });
      }
   

    render() {
     

        return (
            <div className="todoListMain">
                <div className='header'>
                    <form autocomplete="off" action="/action_page.php" onSubmit={this.addItem} >
                        <input ref={(a) => this._inputElement = a}
                            placeholder="Enter ToDo item">
                        </input>
                        <button type="submit" >Add ToDo</button>
                        <button onClick={this.deleteItem}>Clear Completed</button>
                    <img src="http://cdn.shopify.com/s/files/1/1940/0783/products/Tomato_timer_01_1024x1024.png?v=1523492026" alt="tomato-pic"></img>
                        <div className="autocomplete" >
                        <input id="myInput" type="text" name="myTodo" placeholder="Search Todo">
                        </input >
                        
                        </div>

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

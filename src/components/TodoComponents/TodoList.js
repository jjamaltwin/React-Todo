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
        //  Pomodoro functionality 
        var pomodoro = {
            started: false,
            minutes: 0,
            seconds: 0,
            fillerHeight: 0,
            fillerIncrement: 0,
            interval: null,
            minutesDom: null,
            secondsDom: null,
            fillerDom: null,
            init: function () {
                var self = this;
                this.minutesDom = document.querySelector('#minutes');
                this.secondsDom = document.querySelector('#seconds');
                this.fillerDom = document.querySelector('#filler');
                this.interval = setInterval(function () {
                    self.intervalCallback.apply(self);
                }, 1000);
                document.querySelector('#work').onclick = function () {
                    self.startWork.apply(self);
                };
                document.querySelector('#shortBreak').onclick = function () {
                    self.startShortBreak.apply(self);
                };
                document.querySelector('#longBreak').onclick = function () {
                    self.startLongBreak.apply(self);
                };
                document.querySelector('#stop').onclick = function () {
                    self.stopTimer.apply(self);
                };
            },
            resetVariables: function (mins, secs, started) {
                this.minutes = mins;
                this.seconds = secs;
                this.started = started;
                this.fillerIncrement = 200 / (this.minutes * 60);
                this.fillerHeight = 0;
            },
            startWork: function () {
                this.resetVariables(25, 0, true);
            },
            startShortBreak: function () {
                this.resetVariables(5, 0, true);
            },
            startLongBreak: function () {
                this.resetVariables(15, 0, true);
            },
            stopTimer: function () {
                this.resetVariables(25, 0, false);
                this.updateDom();
            },
            toDoubleDigit: function (num) {
                if (num < 10) {
                    return "0" + parseInt(num, 10);
                }
                return num;
            },
            updateDom: function () {
                this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
                this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
                this.fillerHeight = this.fillerHeight + this.fillerIncrement;
                this.fillerDom.style.height = this.fillerHeight + 'px';
            },
            intervalCallback: function () {
                if (!this.started) return false;
                if (this.seconds == 0) {
                    if (this.minutes == 0) {
                        this.timerComplete();
                        return;
                    }
                    this.seconds = 59;
                    this.minutes--;
                } else {
                    this.seconds--;
                }
                this.updateDom();
            },
            timerComplete: function () {
                this.started = false;
                this.fillerHeight = 0;
            }
        };
        window.onload = function () {
            pomodoro.init();
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

        inp.addEventListener("input", function (e) {
            var a, b, i, val = this.value;

            closeAllLists();
            if (!val) { return false; }
            currentFocus = -1;

            a = document.createElement("DIV");
            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");

            this.parentNode.appendChild(a);

            for (i = 0; i < items.length; i++) {

                if (items[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {

                    b = document.createElement("DIV");

                    b.innerHTML = "<strong>" + items[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += items[i].substr(val.length);

                    b.innerHTML += "<input type='hidden' value='" + items[i] + "'>";

                    b.addEventListener("click", function (e) {

                        inp.value = this.getElementsByTagName("input")[0].value;

                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });

        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {

                currentFocus++;

                addActive(x);
            } else if (e.keyCode == 38) {
                currentFocus--;

                addActive(x);
            } else if (e.keyCode == 13) {

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
                if (elmnt != x[i] && elmnt != inp) {
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
                    <div className="pomodoro-wrapper">
                        <div id="pomodoro-app">
                            <div id="container">
                                <div id="timer">
                                    <div id="time">
                                        <span id="minutes">25</span>
                                        <span id="colon">:</span>
                                        <span id="seconds">00</span>
                                    </div>
                                    <div id="filler"></div>
                                </div>

                                <div id="buttons">
                                    <button id="work">Work</button>
                                    <button id="shortBreak">Short Break</button>
                                    <button id="longBreak">Long Break</button>
                                    <button id="stop">Stop</button>
                                </div>
                            </div>
                        </div>
                        <img src="http://cdn.shopify.com/s/files/1/1940/0783/products/Tomato_timer_01_1024x1024.png?v=1523492026" alt="tomato-pic"></img>


                    </div>
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

import React, { Component } from 'react';
import List from './TodoList';

class App extends Component {
  constructor (props){
    super(props);
    this.state ={
      term:'',
      items:[]
    }
  }

  handleInput = (event)=>{
    this.setState({ term: event.target.value});
  }

  handleAddList =(event)=>{
    event.preventDefault();
    this.setState({ term:'',
    items:[...this.state.items, this.state.term]});
    console.log(...this.state.items, this.state.term);
  }
  

  render() {
    return (
      <div>
      <div className="todo">
        <form onSubmit={this.handleAddList}>
          <span><strong>MAKE YOUR TODO LIST</strong></span>
          <div class="form-group ">
            <label for="exampleInputEmail1">Enter tasks</label>
            <input type="text" value={this.state.term} onChange={this.handleInput} class="form-control" id="task" aria-describedby="emailHelp" placeholder="Enter task to do"/>
            <small id="texthelp" class="form-text text-muted">We'll keep your list safe.</small>
          </div>
          <button type="submit" class="btn btn-primary">Add </button>
        </form>
      </div>
      <List items ={this.state.items}/>
      </div>
    );
  }
}

export default App;

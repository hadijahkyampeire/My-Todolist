import React, { Component } from 'react';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';

class Todo extends Component {
  state ={
      name:'',
      description:'',
      day:''
    }
    handleInput = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };

  handleAddList =(event)=>{
    const { name, description, day }= this.state
    event.preventDefault();
    axios.post('http://localhost:5000/todo/todos', {name, description, day})
    .then(response =>{
      notify.show(response.data.messages, 'success', 4000)
      this.props.getTodoLists();
      this.setState({ name: "", description:"", day:"" });
    }).catch(error=>{
      if(error.response){
        notify.show(error.response.data.messages, 'error', 3000)
      }else if(error.request){
        notify.show('Request not made', 'error', 4000)
      }
    });

  }
  

  render() {
    const { name, description, day } = this.state
    return (
      <div>
          <Notifications/>
      <div className="todo">
        <form onSubmit={this.handleAddList}>
          <span><strong>MAKE YOUR TODO LIST</strong></span>
          <div className="form-group ">
            <label htmlFor="name">Enter Name</label>
            <input type="text" value={name} name="name" onChange={this.handleInput} className="form-control" id="task"  placeholder="Enter task to do"/>
            <small id="texthelp" className="form-text text-muted">We'll keep your list safe.</small>
            </div>
            <div>
            <label  htmlFor="description">Enter description</label>
            <input type="text-area" value={description} name="description" onChange={this.handleInput} className="form-control" id="descrition"  placeholder="Enter description"/>
            </div>
            <div>
            <label  htmlFor="days">Choose day</label>
          <select className="form-control" id="exampleFormControlSelect1" value={day} name="day" onChange={this.handleInput}>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>
        </div><br/>
        <div>
          <button type="submit" className="btn btn-primary">Add </button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

export default Todo;

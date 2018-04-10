import React, { Component } from 'react';
import axios from 'axios';
import Notifications, { notify } from 'react-notify-toast';

class Todo extends Component {
  state ={
      name:'',
      description:'',
      day:'Monday'
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
      document.getElementById('CloseAddModal').click();
      this.props.getTodoLists();
      this.setState({ name: "", description:"", day:"" });
    }).catch(error=>{
      if(error.response){
        notify.show('please fill all fields', 'error', 3000)
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
          <button type="button" className="btn btn-default addbtn" data-toggle="modal" data-target="#exampleModal">
          Add Todo
        </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
       <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
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
        <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" id="CloseAddModal">Close</button>
      <button type="submit" className="btn btn-primary">Add </button>
      </div>
        </form>
      </div>
      
    </div>
  </div>
</div>
      
      </div>
    );
  }
}

export default Todo;

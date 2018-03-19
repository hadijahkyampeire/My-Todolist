import React, { Component } from 'react';
import axios from 'axios';
import { notify} from 'react-notify-toast';
import Todo from './Todo';
import DeleteTodolist from './DeleteTodolist';
import EditTodolist from './EditTodolist';


export const Todolist = (props) => (
  
  <div id="accordion">
  <div className="card">
    <div className="card-header" id={`todo-${props.id}`}>
      <h5 className="mb-0">
        <button className="btn btn-link pull-left" data-toggle="collapse" href={`#todoDetails${props.id}`} aria-expanded="true" aria-controls="collapseOne">
        {props.name}
        </button>
        
      </h5>
    </div>

    <div id={`todoDetails${props.id}`} className="collapse show" aria-labelledby={`#todo-${props.id}`} data-parent="#accordion">
      <div className="card-body">
            Date_created: {props.date_created}<br/>
            Description: {props.description}<br/>
            Day: {props.day}  
      </div>
      <div className=" modal-footer text-center " style={{marginBottom:4}}>
      <div className="checkbox">
      <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label className="form-check-label"  htmlFor="exampleCheck1">Done</label>
        </div>
      <button className="btn btn-sm btn-primary" data-toggle="modal" 
      data-target={`#edit_todolist${props.id}`} to="#" ><i className="fa fa-edit"/> Edit</button>
    <button className="btn btn-sm btn-danger " data-toggle="modal" 
    data-target={`#delete_todolist${props.id}`} to="#"><i className="fa fa-trash"/> Delete</button>
    </div>
    </div>
  </div>
  <DeleteTodolist id={props.id} name={props.name} deleteTodolist={props.deleteTodolist}/>
  <EditTodolist id={props.id} name={props.name} description={props.description} day={props.day} editTodolist={props.editTodolist}/>
  </div>
)

class List extends Component {

  state = {
    todolist: []
  }

  getTodoLists = () =>{
    axios.get('http://localhost:5000/todo/todos')
    .then(response=>{
      this.setState({todolist: response.data.todo_items})
    }).catch(error => {
      if (error.response) {
          const { status } = error.response;
          if (status === 404) {
              this.setState({
                  todolist: [],
              });
          }
      } else if (error.request) {
          notify.show("Request not made", 'error', 3000)
      }
  });
  }

  deleteTodolist =(id)=>{
    axios.delete(`http://localhost:5000/todo/todos/${id}`)
    .then(response=>{
      notify.show(response.data.messages, 'success', 4000);
      document.getElementById(`closeModel${id}`).click();
      this.getTodoLists();
    }).catch(error => {
      if (error.response) {
          const { status } = error.response;
          if (status === 404) {
              this.setState({
                  todolist: [],
              });
          }
      } else if (error.request) {
          notify.show("Request not made", 'error', 3000)
      }
  });
  }

  editTodolist=(id, name, description, day)=>{
    axios.put(`http://localhost:5000/todo/todos/${id}`,{name, description, day})
    .then(response=>{
      document.getElementById(`closeEdit${id}`).click();
      notify.show(response.data.messages, 'success', 4000);
      this.getTodoLists();
    }).catch(error => {
      if (error.response) {
          const { status } = error.response;
          if (status === 404) {
              this.setState({
                  todolist: [],
              });
          }
      } else if (error.request) {
          notify.show("Request not made", 'error', 3000)
      }
  });

  }
  componentWillMount() {
    this.getTodoLists();
}
  render(){
    const Todos = this.state.todolist
    let todolistItems = Todos
    .map(todo =>(<Todolist
        name = {todo.name}
        id={todo.id}
        description={todo.description}
        date_created={todo.date_created}
        day={todo.day}
        key={todo.id}
        deleteTodolist={()=>this.deleteTodolist(todo.id)}
        editTodolist={this.editTodolist}/>
      ));
    return(
        <div>
        <Todo getTodoLists={this.getTodoLists}/>
        <hr style={{backgroundColor:'#26A69A', height:2}}/>
        <div className="text-center word"><strong>TODOS</strong></div>
        <div className="row lists">
        {this.state.todolist.length
            ? todolistItems
            : <div className="col-sm-5 offset-sm-3">
                <div className="alert alert-info" role="alert">
                    <strong>Ooops!</strong> No lists , go a head and add some
          </div></div>}
          
        </div>
        </div>
    );
  }
}
export default List;
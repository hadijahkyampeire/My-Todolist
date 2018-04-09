import React, { Component} from 'react';
import axios from 'axios';
import { notify } from 'react-notify-toast';


export const DoneTodolist = (props) => (
  
    <div id="accordion">
    <div className="card">
      <div className="card-header" id={props.id}>
        <h5 className="mb-0">
          <button className="btn btn-link pull-left" data-toggle="collapse" href={`#todoDetails${props.id}`} aria-expanded="true" aria-controls="collapseOne">
          {props.name}
          </button>
          
        </h5>
      </div>
  
      <div id={`todoDetails${props.id}`} className="collapse show" aria-labelledby={props.id} data-parent="#accordion">
        <div className="card-body">
              Date_created: {props.date_created}<br/>
              Description: {props.description}<br/>
              Day: {props.day}  
        </div>
        <div className=" modal-footer text-center " style={{marginBottom:4}}>
        <div className="checkbox">
        <input type="checkbox" className="form-check-input"  onChange={(event)=>props.MarkUndone(props.id, props.name, props.description, props.day, event.target.checked)} id="exampleCheck1"/>
          <label className="form-check-label"  htmlFor="exampleCheck1">UnDo</label>
          </div>
      </div>
      </div>
    </div>
    </div>
  )

  class DoneList extends Component{
    state={
      donelist:[],
      todolist:[]
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

    getdoneTodoLists = () =>{
      axios.get('http://localhost:5000/todo/todos/done')
      .then(response=>{
        this.setState({donelist: response.data.todo_items})
      }).catch(error => {
        if (error.response) {
            const { status } = error.response;
            if (status === 404) {
                this.setState({
                    donelist: [],
                });
            }
        } else if (error.request) {
            notify.show("Request not made", 'error', 3000)
        }
    });
    }

    markAsUnDone=(id, name, description, day, done)=>{
      // console.log(!done)
      done = !done;
      axios.put(`http://127.0.0.1:5000/todo/todos/${id}`, {name,description, day, done})
      .then(response=>{
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
      this.getdoneTodoLists();
    }

    render(){
      const DoneTodos = this.state.donelist
      let todolistItems = DoneTodos
      .map(todo =>(<DoneTodolist
          MarkUndone={this.markAsUnDone}
          name = {todo.name}
          id={todo.id}
          description={todo.description}
          date_created={todo.date_created}
          day={todo.day}
          done={todo.done}
          key={todo.id}
          />
        ));

      return(
        <div>
        <hr style={{backgroundColor:'#26A69A', height:2}}/>
        <div className="text-center word"><strong>DONE TODOS</strong></div>
        <div className="row lists">
        {this.state.donelist.length
            ? todolistItems
            : <div className="col-sm-5 offset-sm-3">
                <div className="alert alert-info" role="alert">
                    <strong>Ooops!</strong> No done lists yet
          </div></div>}
          
        </div>
        </div>
      );
    }


  }
  export default DoneList;
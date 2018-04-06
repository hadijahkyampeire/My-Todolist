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
    </div>
  )

  class DoneList extends Component{
    state={
      donelist:[]
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
    componentWillMount() {
      this.getdoneTodoLists();
    }

    render(){
      const DoneTodos = this.state.donelist
      let todolistItems = DoneTodos
      .map(todo =>(<DoneTodolist
          Markdone={this.markAsDone}
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
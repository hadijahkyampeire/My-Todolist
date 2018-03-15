import React, { Component } from 'react';
import axios from 'axios';
import Todo from './Todo';


export const Todolist = (props) => (

  <div className="col-md-4 col-lg-3 col-sm-6 category-card">
      <div className="card ">
          <div className="card-block color word-font" >
              <h3 className="card-title">{props.name}</h3>
              <div className="card-block">Date_created: {props.date_created}<br/>
                  </div>
          </div>
      </div>
  </div>
)

class List extends Component {

  state = {
    todolist: []
  }

  getTodoLists = () =>{
    axios.get('http://localhost:5000/todo/todos')
    .then(response=>{
      this.setState({...response.data})
      console.log(response.data.messages.todo_items)
    }).catch(error => {
      if (error.response) {
          const { status } = error.response;
          if (status === 404) {
              this.setState({
                  todolist: [],
              });
          }
      } else if (error.request) {
          alert("Request not made")
      }
  });
  }
  componentWillMount() {
    this.getTodoLists();
}
  render(){
    
    let todolistItems = this.state.todolist.map(messages =>(<Todolist
      name = {messages.todo_items.name}
      id={messages.todo_items.id}
      description={messages.todo_items.description}
      date_created={messages.todo_items.date_created}
      key={messages.todo_items.id}
      {...messages.todo_items}/>
      
    )  );
    console.log(todolistItems)
    return(
        <div className="row ">
        <Todo getTodoLists={this.getTodoLists}/>
        {this.state.todolist.length
            ? todolistItems
            : <div className="col-sm-5 offset-sm-3">
                <div className="alert alert-info" role="alert">
                    <strong>Ooops!</strong> No lists , go a head and add some
          </div></div>}
        </div>
    );
  }
}
export default List;
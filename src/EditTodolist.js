import React ,{Component}from 'react';

/**
 * Component for handling editing categories.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class EditCategory extends Component {
    state = {
        name:'',
        description:'',
      day:''
    }
    /**
     * @param {object} event - The element which handles edit category
     */
    handleEditTodolist =(event) =>{
        event.preventDefault();
        this.props.editTodolist(this.props.id, this.state.name, this.state.description, this.state.day, this.props.done)
    }
    handleInput =(event) =>{
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    // updates the state before rendering the component
    componentWillMount(){
        this.setState({name:this.props.name, description:this.props.description, day:this.props.day})
    }
    render() {
        const {name, description, day} = this.state
        return (
            <div
                className="modal fade"
                id={`edit_todolist${this.props.id}`}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit category name</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
        <div id="edittodo">
        <form onSubmit={this.handleEditTodolist}>
          <span><strong>EDIT YOUR TODO LIST</strong></span>
          <div className="form-group ">
            <label htmlFor="name">Enter Name</label>
            <input type="text" value={name} name="name" onChange={this.handleInput} className="form-control" id="task"  placeholder="Enter task to do"/>
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
        <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" id={`closeEdit${this.props.id}`}aria-label="Close">Close</button>
          <button type="submit" className="btn btn-primary">Save </button>
          
          </div>
        </form>
      </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default EditCategory;
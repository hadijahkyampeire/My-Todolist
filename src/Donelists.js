import React from 'react'

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
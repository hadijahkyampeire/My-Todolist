import React from 'react';

const List = props => (

    <div class="card" style={{width: 600}}>
    <h5>Your Todo List</h5>
  <ul class="list-group list-group-flush">
    <li class="list-group-item ">{
        props.items.map((item, index) => <li key={index}>{item}</li>)
      }</li>
  </ul>
</div>

  );
  
  export default List;
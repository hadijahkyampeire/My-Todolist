import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import List from './TodoList';
import Nav from './Navbar';

class App extends Component {
  render() {
    return (
     <BrowserRouter>
      <div className="App">
      <Nav/>
      <Switch>
      <Route exact path="/" component={List}/>
      </Switch>
      </div>
      </BrowserRouter>
      
    );
  }
}

export default App;

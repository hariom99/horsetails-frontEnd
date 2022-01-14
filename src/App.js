
import { Route, Switch } from 'react-router-dom';
import './App.css';
import BoardDetails from './components/board-details/boardDetails';
import CreateTask from './components/create-task/createTask';
import Login from './components/login/login';
import Boards from './components/my-boards/boards';
import Signup from './components/signup/signup';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/myboards" component={Boards} />
        <Route exact path="/myboards/create-board" >
          <Boards isCreateBoard={true} />
        </Route>
        <Route exact path="/board-details" component={BoardDetails} />
        <Route exact path="/board-details/create-task" component={CreateTask} />
      </Switch>
    </div>
  );
}

export default App;

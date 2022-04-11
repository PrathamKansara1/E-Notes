import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/nav';
import NoTeS from './components/notes';
import Playwithnotes from './components/playwithnotes';
import Hist from './components/history';
import Login from './components/login.js';
import SignUp from './components/signup';

function App() {
  return (
    <Router>

      <Switch>

        <Route exact path='/'>
          <Nav />
          <NoTeS />
        </Route>

        <Route exact path='/Notes'>
          <Nav />
          <NoTeS />
        </Route>

        <Route exact path='/PlayWithNotes'>
          <Nav />
          <Playwithnotes />
        </Route>

        <Route exact path='/History'>
          <Nav />
          <Hist />
        </Route>

        <Route exact path='/Login'>
          <Nav/>
          <Login />
        </Route>

        <Route exact path='/Signup'>
          <Nav/>
          <SignUp />
        </Route>

      </Switch>

    </Router>
  );
}

export default App;

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from './features/login/Login';
import { Task } from './features/tasks/Task';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/login/loginSlice';

function App() {
  const token = useSelector(s => s.login.token)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }
  
  return (
    <Router>
      <div className="App container">
        <header className="App-header">
          <h1>
            <Link className="head" to="/">задачник</Link>
          </h1>
          <nav>
            { token ? <button onClick={onLogout}>выйти</button> : <Link to="/login">Авторизоваться</Link> }
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <Task />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </main>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

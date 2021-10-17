import {
  BrowserRouter as Router, 
  Switch, 
  Route} from 'react-router-dom'
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container pe-0 ps-0">
          <Navbar />
          <Switch>
              <Route path="/login">
                  <Login /> 
              </Route>
              <Route path="/admin">
                  Admin
              </Route>
              <Route path="/" exact>
                  Home
              </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;

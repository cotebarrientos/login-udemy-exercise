import {
  BrowserRouter as Router, 
  Switch, 
  Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="container">
          navbar...
          <Switch>
              <Route path="/login">
                  Login 
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

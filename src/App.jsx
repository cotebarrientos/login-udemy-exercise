import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, 
  Switch, 
  Route} from 'react-router-dom'
import Admin from './components/Admin';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {auth } from './firebase'


function App() {

  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
        console.log(user)
        if(user){
            setFirebaseUser(user)
        }else{
            setFirebaseUser(null)
        }
    })
}, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="container pe-0 ps-0">
          <Navbar firebaseUser={firebaseUser} />
          <Switch>
              <Route path="/login">
                  <Login /> 
              </Route>
              <Route path="/admin">
                  <Admin />
              </Route>
              <Route path="/" exact>
                  <Home />
              </Route>
          </Switch>
      </div>
    </Router>
  ) : (
    <div>Loading ...</div>
  );
}

export default App;

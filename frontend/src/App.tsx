import { Route, Switch, Redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import AdminLogin from './components/Admin/Login';
import Users from './components/Admin/Users';
import Header from './components/Header';
import Register from './components/Register';
import Admin from './components/Admin';
import { logout } from './actions/admin';
import { LogInContext } from './context/auth';

function App() {
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    setLoginStatus(localStorage.getItem('admin_token') !== null);
  }, []);

  const onLogout = () => {
    setLoginStatus(false);
    logout();
  }

  return (
    <div className="App">
      <LogInContext.Provider value={{ loginStatus, login: () => setLoginStatus(true), logout: onLogout }} >
        <Header />
        <Switch>
          <Route path="/" exact component={Register} />
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/users" component={Users} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </LogInContext.Provider>
    </div>
  );
}

export default App;

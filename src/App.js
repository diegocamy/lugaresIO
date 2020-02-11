import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar } from './layout/Navbar';
import Lugares from './lugares/containers/Lugares';
import Login from './lugares/containers/Login';
import Register from './lugares/containers/Register';
import Profile from './lugares/containers/Profile';
import EditarPerfil from './lugares/containers/EditarPerfil';
import NotFound from './lugares/containers/NotFound';
import NuevoLugar from './lugares/containers/NuevoLugar';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Lugares} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/edit-profile/:id' component={EditarPerfil} />
          <Route exact path='/add-place' component={NuevoLugar} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;

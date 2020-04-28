import React from 'react'
import {Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import Page404 from '../layout/Page404';

const Routes = () => {
    return (
        <section className="container">
        <Alert /> 
        <Switch>
          <Route exact path ="/register" component={Register} />
          <Route exact path ="/login" component={Login} />
          <PrivateRoute exact path ="/dashboard" component={Dashboard} />
        <Route component={Page404}/>
        </Switch>
      </section>
    )
}

export default Routes

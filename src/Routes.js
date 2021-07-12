import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Auth = lazy(() => import('./view/auth'));
const Register = lazy(() => import('./view/register'));
const Welcome = lazy(() => import('./Welcome'));
const Items = lazy(() => import('./view/items'));
const Me = lazy(() => import('./view/me'));


const Routes = () => (

  <Router>
    <Suspense fallback={
      <div className='d-flex justify-content-center mt-5 pt-5'>
        <CircularProgress />
      </div>
    }>
      <Switch>
        <Route exact path='/' component={Welcome}></Route>
        <Route exact path='/login' component={Auth}></Route>
        <Route exact path='/signUp' component={Register}></Route>
        <Route path='/me' component={Me}></Route>
        <Route path='/items' component={Items}></Route>
        <Route path='*' component={()=>(<h1> Not Found </h1>)}></Route>
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import UserList from './containers/UserListView';
import LinkList from './containers/LinkListView';
import CreateLink from './containers/CreateLink';
import Login from './containers/Login';
import Signup from './containers/Signup';

import { AUTH_TOKEN } from './constants'
const BaseRouter = () => (
    <div>
        <Route exact path='/' render={() => AUTH_TOKEN?<Redirect to='/login/' />:<Redirect to='/userList/' />} />
        <Route exact path='/list/' component={ LinkList } />
        <Route exact path='/userList/' component={ UserList } />
        <Route exact path='/createLink/' component={CreateLink} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={Signup} />
    </div>
);

export default BaseRouter;
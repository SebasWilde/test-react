import React from 'react';
import { Route } from 'react-router-dom';

import UserList from './containers/UserListView';
import LinkList from './containers/LinkListView';
import CreateLink from './containers/CreateLink';
import Login from './containers/Login';

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={ UserList } />
        <Route exact path='/list/' component={ LinkList } />
        <Route exact path='/createLink/' component={CreateLink} />
        <Route exact path='/login/' component={Login} />
    </div>
);

export default BaseRouter;
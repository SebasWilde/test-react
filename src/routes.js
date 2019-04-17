import React from 'react';
import { Route } from 'react-router-dom';

import UserList from './containers/UserListView';
import LinkList from './containers/LinkListView'

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={ UserList } />
        <Route exact path='/list/' component={ LinkList } />
    </div>
);

export default BaseRouter;
import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';

import App from './app/route';

import Error from './app/common/error/route';
import Users from './app/common/users/route';
import Roles from './app/common/roles/route';

import Dashboard from './app/tenant/dashboard/route';
import TenantSettings from './app/tenant/settings/route';

import Editions from './app/host/editions/route';
import Tenants from './app/host/tenants/route';

import { urls } from './utils';

export default function ({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} >
        <IndexRedirect to={urls.tenant.dashboard} />
        <Route path={urls.common.users} component={Users} />
        <Route path={urls.common.roles} component={Roles} />
        <Route path={urls.tenant.dashboard} component={Dashboard} />
        <Route path={urls.tenant.settings} component={TenantSettings} />
        <Route path={urls.host.editions} component={Editions} />
        <Route path={urls.host.tenants} component={Tenants} />
        <Route path="*" component={Error} />
      </Route>
    </Router>
  );
}

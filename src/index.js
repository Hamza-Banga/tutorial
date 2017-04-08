import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import './index.html';
import './index.css';

// 1. Initialize
const app = dva({
  history: browserHistory,
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./app/model'));

// //model common
app.model(require('./app/common/users/model'));
app.model(require('./app/common/roles/model'));

// //model host
app.model(require('./app/host/editions/model'));
app.model(require('./app/host/tenants/model'));

// //model tenant
app.model(require('./app/tenant/settings/model'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

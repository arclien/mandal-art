import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { GlobalTheme } from 'remember-ui';

import { TrelloProvider } from 'context/TrelloContext';
import Routes from 'routers/routes';
import CommonRoute from 'routers/CommonRoute';
import Dashboard from 'pages/Dashboard/Dashboard';

import { AppBody } from './App.styles';

const PREFIX = '/mandal-art';

function App() {
  const { root } = Routes;

  return (
    <TrelloProvider>
      <BrowserRouter basename={PREFIX}>
        <AppBody>
          <GlobalTheme />
          <Switch>
            <CommonRoute path={root.path}>
              <Dashboard />
            </CommonRoute>
            <Redirect to={root.path} />
          </Switch>
        </AppBody>
      </BrowserRouter>
    </TrelloProvider>
  );
}

export default App;

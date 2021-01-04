import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { GlobalTheme } from 'remember-ui';

import GlobalConfirmModal from 'components/GlobalConfirmModal/GlobalConfirmModal';
import { TrelloProvider } from 'context/TrelloContext';
import { ConfirmModalProvider } from 'context/ConfirmModalContext';
import { TrelloMyInfoProvider } from 'context/TrelloMyInfoContext';
import GlobalHelmet from 'components/GlobalHelmet/GlobalHelmet';
import Routes from 'routers/routes';
import CommonRoute from 'routers/CommonRoute';
import Home from 'pages/Home/Home';
import Dashboard from 'pages/Dashboard/Dashboard';

import { AppBody } from './App.styles';

const BASE_URL = '/mandal-art';

function App() {
  const { root, board } = Routes;

  return (
    <ConfirmModalProvider>
      <TrelloMyInfoProvider>
        <TrelloProvider>
          <GlobalHelmet />
          <BrowserRouter basename={BASE_URL}>
            <AppBody>
              <GlobalTheme />
              <Switch>
                <CommonRoute path={board.path}>
                  <Dashboard />
                </CommonRoute>
                <CommonRoute path={root.path}>
                  <Home />
                </CommonRoute>
                <Redirect to={root.path} />
              </Switch>
            </AppBody>
            <GlobalConfirmModal />
          </BrowserRouter>
        </TrelloProvider>
      </TrelloMyInfoProvider>
    </ConfirmModalProvider>
  );
}

export default App;

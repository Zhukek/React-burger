import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app.jsx';
import reportWebVitals from './reportWebVitals';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/wsSocket';
import thunk from 'redux-thunk';
import { WS_SOCKET_OPEN, WS_SOCKET_CLOSE, WS_OPEN_SUCCESS, WS_CLOSE_SUCCESS, WS_SOCKET_ERROR,
  WS_SOCKET_ONMESSAGE, WS_SOCKET_OPEN_PRIVATE, WS_SOCKET_ONMESSAGE_PRIVATE } from './services/actions/wsSocket';

const wsActions = {
  open: WS_SOCKET_OPEN,
  close: WS_SOCKET_CLOSE,
  onOpen: WS_OPEN_SUCCESS,
  onClose: WS_CLOSE_SUCCESS,
  error: WS_SOCKET_ERROR,
  onMessage: WS_SOCKET_ONMESSAGE,
  openPrivate: WS_SOCKET_OPEN_PRIVATE,
  onMessagePrivate: WS_SOCKET_ONMESSAGE_PRIVATE
}
const wsAllURL = 'wss://norma.nomoreparties.space/orders/all';
const wsPrivateURL = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsActions, wsAllURL, wsPrivateURL)));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>, 

document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
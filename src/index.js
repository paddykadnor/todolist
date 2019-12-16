import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import store from "./store/store";

WebFont.load({
  google: {
    families: ['Roboto', 'sans-serif']
  }
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

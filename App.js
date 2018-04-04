import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Main from "./Main";
import { reducer } from "./Modules";


//create instance of store here
const store = createStore(reducer);

export default () => (
  <Provider store={store}>
    <Main />
  </Provider>
);
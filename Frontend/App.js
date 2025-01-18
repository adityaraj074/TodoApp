import React from 'react';
import {View, Text} from 'react-native';
import store from './src/store/store';
import {Provider} from 'react-redux';
import MainNavigator from './Navigation.js';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/Router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor, Store } from './src/redux/store/Store';

class App extends Component {
  state = {};
  render() {
    return (
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

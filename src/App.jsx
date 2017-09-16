import * as React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Route} from 'react-router-dom';
import io from 'socket.io-client';

import {Content} from 'yui-md/lib/Content';
import FacebookProvider, { Login } from 'react-facebook';

import {reducer} from './reducer';
import {Footer} from './Footer';
import {Pages} from './Pages';
import {Header} from './Header';

//Application state store.
let store = createStore(reducer);

class App extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  render() {
    return (
      <FacebookProvider appId="805896649572423">
        <Provider store={store}>
          <Route path={'/'}>
            <div className={'app-root'}>
              <Header/>
              <Content footerComponent={<Footer/>}>
                <Pages>
                </Pages>
              </Content>
            </div>
          </Route>
        </Provider>
      </FacebookProvider>
    );
  }
}

export default App;
export {App};

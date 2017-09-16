import * as React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Route} from 'react-router-dom';
import io from 'socket.io-client';
import FacebookProvider, { Login } from 'react-facebook';

import {Content} from 'yui-md/lib/Content';
import {Button} from 'yui-md/lib/Button';

import {reducer} from './reducer';
import {Footer} from './Footer';

//Application state store.
let store = createStore(reducer);

class App extends React.Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
  }

  render() {
    return (
      <Provider store={store}>
        <Route path={'/'}>
          <div className={'app-root'}>
            <Content footerComponent={<Footer/>}>
              <FacebookProvider appId="805896649572423">
                <Login
                  scope="email"
                  onResponse={this.handleResponse}
                  onError={this.handleError}
                >
                  <Button>
                    Login via Facebook
                  </Button>
                </Login>
              </FacebookProvider>
            </Content>
          </div>
        </Route>
      </Provider>
    );
  }
}

export default App;
export {App};

import * as React from 'react';
import {Login} from 'react-facebook';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Button} from 'yui-md/lib/Button';

import io from 'socket.io-client';
/*
  Props:
  - tryLogin <function>
*/
class LoginButton extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    window.socket = window.socket || io('https://localhost:9443');
  }

  tryLogin() {
    window.socket.emit('checkUserExists', {id: FB.getUserID()});
  }

  render() {
    return (
      <Login
        scope="email"
        onResponse={this.props.tryLogin || this.tryLogin}
        onError={this.handleError}>
        <Button className={'centered'} {...this.props}>
          {this.props.verbose ? 'Login via Facebook' : 'Login'}
        </Button>
      </Login>
    );
  }

}

LoginButton = withRouter(Guac(LoginButton));

export default LoginButton;
export {LoginButton};

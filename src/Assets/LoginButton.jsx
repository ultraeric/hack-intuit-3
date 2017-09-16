import * as React from 'react';
import {Login} from 'react-facebook';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Button} from 'yui-md/lib/Button';

class LoginButton extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  tryLogin() {
    this.props.history.push('/newuser');
  }

  render() {
    return (
      <Login
        scope="email"
        onResponse={this.tryLogin}
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

import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';
import {Login} from 'react-facebook';

import {LoginButton} from '../../Assets/LoginButton';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  render() {
    return (
      <div className={'login-page'}>
        <div style={{height: '20px'}}/>
        <h2 className='centered'>
          Welcome to FinTel
        </h2>
        <h4 className='centered'>
          Your personal finance manager
        </h4>
        <div style={{height: '80px'}}/>
        <LoginButton large verbose/>
      </div>
    );
  }
}

LoginPage = Guac(LoginPage);

export default LoginPage;
export {LoginPage};

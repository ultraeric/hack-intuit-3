import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

LoginPage = Guac(LoginPage);

export default LoginPage;
export {LoginPage};

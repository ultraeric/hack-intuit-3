import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';
import {Route, Switch} from 'react-router-dom';

import {Button} from 'yui-md/lib/Button';

import FacebookProvider, { Login } from 'react-facebook';

import {LoginPage} from './LoginPage';
import {NewUser} from './NewUser';

class Pages extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }

  render() {
    return (
      <div className={'page'}>
        <Route path='*' render={() => {window.scrollTo(0, 0); return null;}}/>
        <Switch>
          <Route path='/newuser' component={NewUser}/>
          <Route path='/' component={LoginPage}/>
        </Switch>
      </div>
    );
  }
}

Pages = Guac(Pages);

export default Pages;
export {Pages};

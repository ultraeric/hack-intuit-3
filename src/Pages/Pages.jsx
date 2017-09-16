import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';
import {Route, Switch} from 'react-router-dom';

import {Button} from 'yui-md/lib/Button';

import FacebookProvider, { Login } from 'react-facebook';


class Pages extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
  }


//        <Switch>
//        <Route path='/' component={}/>
//        </Switch>
  render() {
    return (
      <div className={'page'}>
        <Route path='*' render={() => {window.scrollTo(0, 0); return null;}}/>
      </div>
    );
  }
}

Pages = Guac(Pages);

export default Pages;
export {Pages};

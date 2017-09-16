import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Input} from 'yui-md/lib/Input';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';

class NewUser extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    this.state = {
      newUserData: {

      }
    };
  }

  render() {
    return (
      <div className={'new-user'}>
        <Row>
          <Col xs={12} sm={6}>
            <Input label={'Country'}>
              {this.state.newUserData.country}
            </Input>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Family Origin Country'}>
              {this.state.newUserData.origin}
            </Input>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Race'}>
              {this.state.newUserData.race}
            </Input>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Age'}>
              {this.state.newUserData.age}
            </Input>
          </Col>
        </Row>
      </div>
    );
  }
}

NewUser = Guac(NewUser);

export default NewUser;
export {NewUser};

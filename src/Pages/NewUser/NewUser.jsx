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
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12} s={6}>
            <Input label={'Information'}></Input>
          </Col>
        </Row>
      </div>
    );
  }
}

NewUser = Guac(NewUser);

export default NewUser;
export {NewUser};

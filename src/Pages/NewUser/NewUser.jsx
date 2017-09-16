import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Input} from 'yui-md/lib/Input';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';
import {Button} from 'yui-md/lib/Button';

class NewUser extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    this.state = {
      newUserData: {
      }
    };
    window.socket = window.socket || io('http://localhost:9080');
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
  }

  tryCreateNewUser() {
    let newUserData = this.state.newUserData;
    newUserData.id = FB.getUserID();
    window.socket.emit('newUser', newUserData);
  }

  onChange(field, event) {
    event.persist();
    let data = event.target.value;
    let newUserData = this.state.newUserData;
    newUserData[field] = data;
    this.setState({newUserData: newUserData});
  }

  render() {
    return (
      <div className={'new-user'}>
        <h3 className={'centered'}>Welcome to FinTel!</h3>
        <p className={'centered title'}>Please enter this info for the best experience</p>
        <Row>
          <Col xs={12}>
            <Input label={'Name'} onChange={(event) => this.onChange('name', event)}>
              {this.state.newUserData.name}
            </Input>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Country'} onChange={(event) => this.onChange('country', event)}>
              {this.state.newUserData.country}
            </Input>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Family Origin Country'}
              onChange={(event) => this.onChange('origin', event)}>
              {this.state.newUserData.origin}
            </Input>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Race'}
              onChange={(event) => this.onChange('race', event)}>
              {this.state.newUserData.race}
            </Input>
          </Col>
          <Col xs={12} sm={6}>
            <Input label={'Housing Situation'}
              onChange={(event) => this.onChange('housing', event)}>
              {this.state.newUserData.housing}
            </Input>
          </Col>
          <Col xs={6}>
            <Input label={'Age'}
              onChange={(event) => this.onChange('age', event)}>
              {this.state.newUserData.age}
            </Input>
          </Col>
          <Col xs={6}>
            <Input label={'Gender'}
              onChange={(event) => this.onChange('gender', event)}>
              {this.state.newUserData.gender}
            </Input>
          </Col>
          <Col xs={12}>
            <Input label={'Income ($/month)'}
              onChange={(event) => this.onChange('income', event)}>
              {this.state.newUserData.income}
            </Input>
          </Col>
          <Col xs={12}>
            <Input label={'Citizenship'}
              onChange={(event) => this.onChange('citizenship', event)}>
              {this.state.newUserData.citizenship}
            </Input>
          </Col>
        </Row>
        <div style={{height: '30px'}}/>
        <Button className={'centered'} onClick={this.tryCreateNewUser}>
          Join Us
        </Button>
      </div>
    );
  }
}

NewUser = withRouter(Guac(NewUser));

export default NewUser;
export {NewUser};

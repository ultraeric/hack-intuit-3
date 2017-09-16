import * as React from 'react';
import {withRouter} from 'react-router';
import {Guac} from 'guac-hoc/lib/Guac';

import {Input} from 'yui-md/lib/Input';
import {Row} from 'yui-md/lib/Row';
import {Col} from 'yui-md/lib/Col';
import {Button} from 'yui-md/lib/Button';

class NewGoal extends React.Component {
  constructor() {
    super();
    this.bindAllMethods();
    this.state = {
      newGoalData: {
      }
    };
    window.socket = window.socket || io('https://www.csua.berkeley.edu:9443', {secure: true});
    window.socket.on('redirectHome', (data) => {
      this.props.history.push('/home');
    });
  }

  tryCreateNewGoal() {
    let newGoalData = this.state.newGoalData;
    newGoalData.id = FB.getUserID();
    window.socket.emit('newGoal', newGoalData);
  }

  onChange(field, event) {
    event.persist();
    let data = event.target.value;
    let newGoalData = this.state.newGoalData;
    newGoalData[field] = data;
    this.setState({newGoalData: newGoalData});
  }

  render() {
    return (
      <div className={'new-goal'}>
        <h3 className={'centered'}>Create a New Goal</h3>
        <Row>
          <Col xs={12}>
            <Input label={'Item'} onChange={(event) => this.onChange('item', event)}>
              {this.state.newGoalData.item}
            </Input>
          </Col>
          <Col xs={12}>
            <Input label={'Cost'} onChange={(event) => this.onChange('cost', event)}>
              {this.state.newGoalData.cost}
            </Input>
          </Col>
        </Row>
        <div style={{height: '30px'}}/>
        <Button className={'centered'} onClick={this.tryCreateNewGoal}>
          New Goal
        </Button>
      </div>
    );
  }
}

NewGoal = withRouter(Guac(NewGoal));

export default NewGoal;
export {NewGoal};

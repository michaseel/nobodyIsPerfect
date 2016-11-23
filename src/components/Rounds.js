import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import _ from 'lodash';

class Rounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h2>Runden</h2>
        <List>
          { this.props.rounds.map((round, key) => (
            <ListItem
              key={key}
              onClick={() => console.log('this should open a modal')}
              rightIcon={<IconEdit  />}
              leftAvatar={
                <Avatar >{key+1}</Avatar>
              }
              primaryText={round.question}
              secondaryText={_.size(round.answers) + ' Antworten'}
            />
          ))
          }
        </List>
        <RaisedButton label="Add Round" onClick={this.props.createRound} />
      </div>
    );
  }
}

export default Rounds;

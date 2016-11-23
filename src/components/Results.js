import React, { Component } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import _ from 'lodash';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlayers: false,
    }
  }

  render() {
    return (
      <div>
        <h5>Ergebnisse präsentieren</h5>
        <h1>{this.props.currentRoundData.question}</h1>
        <List>
          { _.map(this.props.currentRoundData.answers, (answer, id) => {
            const player = _.find(this.props.players, player => player.id === parseInt(id, 10) );
            if (_.isUndefined(player)) return null;
            return (
              <ListItem
                key={id}
                onClick={() => console.log('this should open a modal')}
                primaryText={answer.text}
                secondaryText={this.state.showPlayers && player.name}
              />
            )
          })
          }
        </List>
      </div>
    )
  }
}


export default Results;

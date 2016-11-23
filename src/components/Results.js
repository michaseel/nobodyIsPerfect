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
    const shuffeledAnswers = this.props.currentRoundData.shuffeledIds.map(id => {
      if (id === -1) {
        return {
          text: this.props.currentRoundData.answer,
          points: this.props.currentRoundData.points,
          id,
          name: 'Richtige Antwort',
        }
      } else {
        const player = _.find(this.props.players, player => player.id === parseInt(id, 10) );
        if (_.isUndefined(player)) return undefined;
        return {
          text: this.props.currentRoundData.answers[id].text,
          points: 0,
          id: player.id,
          name: player.name,
        }
      }
    }).filter(answer => !_.isUndefined(answer));
    console.log(shuffeledAnswers);
    return (
      <div>
        <h5>Ergebnisse präsentieren</h5>
        <h1>{this.props.currentRoundData.question}</h1>
        <List>
          { _.map(shuffeledAnswers, (answer, key) => {
            return (
              <ListItem
                key={key}
                onClick={() => console.log('this should increment the answers points')}
                primaryText={answer.text}
                secondaryText={this.state.showPlayers && answer.name}
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

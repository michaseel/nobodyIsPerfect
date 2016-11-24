import React, { Component } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import _ from 'lodash';

class Results extends Component {

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
    return (
      <div>
        <h1>{this.props.currentRoundData.question}</h1>
        <List>
          { _.map(shuffeledAnswers, (answer, key) => {
            return (
              <ListItem
                style={{fontSize: 20}}
                key={key}
                onClick={() => console.log('this should increment the answers points')}
                primaryText={this.props.currentRoundData.showAnswers ? answer.text : '???????????????'}
                secondaryText={this.props.currentRoundData.showPlayers && answer.name}
                leftAvatar={<Avatar>{key+1}</Avatar>
                }
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

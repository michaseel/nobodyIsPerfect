import React, { Component } from 'react';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconHelp from 'material-ui/svg-icons/communication/live-help';
import IconQuestion from 'material-ui/svg-icons/action/question-answer';
import IconPerson from 'material-ui/svg-icons/social/person';

import _ from 'lodash';

const bottomNavStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
};

class Results extends Component {

  addPoints = (id) => () => {
    this.props.setAnswerPoints(id, 1);
    this.props.setPlayerPoints(id, 1);
  };

  removePoints = (id) => (e) => {
    e.preventDefault();
    this.props.setAnswerPoints(id, -1);
    this.props.setPlayerPoints(id, -1);
  };

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
          points: this.props.currentRoundData.answers[id].points,
          id: player.id,
          name: player.name,
        }
      }
    }).filter(answer => !_.isUndefined(answer));

    const activeStep = this.props.currentRoundData.showAnswers + this.props.currentRoundData.showPlayers;

    return (
      <div>
        <h1>{this.props.currentRoundData.question}</h1>
        <List>
          { _.map(shuffeledAnswers, (answer, key) => {
            return (
              <ListItem
                style={{fontSize: 20}}
                key={key}
                primaryText={this.props.currentRoundData.showAnswers ? answer.text : '???????????????'}
                secondaryText={this.props.currentRoundData.showPlayers && answer.name}
                onClick={this.addPoints(answer.id)}
                onContextMenu={this.removePoints(answer.id)}
                leftAvatar={<Badge
                  badgeContent={answer.points}
                  secondary
                  style={{marginTop: -20, marginLeft: -20}}
                  badgeStyle={{top: 12, right: 12, visibility: answer.points > 0 ? 'visible' : 'hidden'}}
                >
                  <Avatar>{String.fromCharCode(97 + key).toUpperCase()}</Avatar>
                </Badge>}
              />
            )
          })
          }
        </List>
        <Paper zDepth={1} style={bottomNavStyle}>
          <BottomNavigation selectedIndex={activeStep} >
            <BottomNavigationItem
              label="Antworten"
              icon={<IconHelp />}
              onTouchTap={() => {
                this.props.showAnswers(this.props.currentRound, false);
                this.props.showPlayers(this.props.currentRound, false);
              }}
            />
            <BottomNavigationItem
              label="Abstimmen"
              icon={<IconQuestion />}
              onTouchTap={() => this.props.showAnswers(this.props.currentRound, true)}
            />
            <BottomNavigationItem
              label="Aufdecken"
              icon={<IconPerson />}
              onTouchTap={() => this.props.showPlayers(this.props.currentRound, true)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    )
  }
}


export default Results;

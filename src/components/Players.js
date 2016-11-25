import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import IconDelete from 'material-ui/svg-icons/action/delete';
import Paper from 'material-ui/Paper';

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlayerName: ''
    }
  }
  addPlayer = (e) => {
    e.preventDefault();
    const name = this.state.newPlayerName;
    this.props.createPlayer(name);
    this.setState({
      newPlayerName: '',
    });
  };

  handleChange = (event) => {
    this.setState({
      newPlayerName: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <h2>Punktestand</h2>

        <Paper zDepth={2}>
          <List>
            { this.props.players.map((player) => (
              <ListItem
                key={player.id}
                onClick={() => this.props.setPlayerPoints(player.id, 1)}
                onContextMenu={(e) => {e.preventDefault(); this.props.setPlayerPoints(player.id, -1)}}
                rightIcon={<IconDelete onClick={() => this.props.deletePlayer(player.id)} />}
                leftAvatar={
              <Avatar >{player.points}</Avatar>
            }
              >
                {player.name}
              </ListItem>
            ))
            }
          </List>
        </Paper>

        <form onSubmit={this.addPlayer}>
          <TextField
            floatingLabelText="Name"
            onChange={this.handleChange}
            value={this.state.newPlayerName}
          />
          <RaisedButton label="Spieler hinzufügen" onClick={this.addPlayer} />
        </form>
      </div>
    );
  }
}

export default Players;

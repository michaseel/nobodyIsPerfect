import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';

class Answers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      activePlayer: 0,
      showSuccessMessage: false,
    }
  }

  selectPlayer = (event, index, value) => this.setState({ activePlayer: value});
  handleChange = (event) => {
    this.setState({
      answer: event.target.value,
    });
  };
  storeAnswer = (e) => {
    e.preventDefault();
    let answerError = false;
    let playerError = false;

    if (this.state.answer === '') {
      answerError = true;
    }
    if (this.state.activePlayer === 0) {
      playerError = true;
    }

    if (playerError || answerError) {
      this.setState({
        answerError,
        playerError,
      });
    } else {
      this.props.setAnswer(this.state.activePlayer, this.state.answer);
      this.setState({
        answer: '',
        activePlayer: 0,
        answerError,
        playerError,
        showSuccessMessage: true,
      });
    }
  };

  hideSuccessMessage = () => {
    this.setState({
      showSuccessMessage: false,
    });
  };

  paperStyle = {
    padding: 20,
  };

  render() {
    return (
      <div>
        <h1>{this.props.currentRoundData.question}</h1>

        <Paper style={this.paperStyle} zDepth={3}>
          <form onSubmit={this.storeAnswer}>
            <SelectField
              fullWidth
              floatingLabelText="Spieler auswählen"
              onChange={this.selectPlayer}
              value={this.state.activePlayer}
              menuStyle={{ maxWidth: 440 }}
              errorText={this.state.playerError && 'Bitte wählen sie einen Spieler aus'}
            >
              { this.props.players.map((player) => (
                <MenuItem key={player.id} value={player.id} primaryText={player.name} />
              ))}
            </SelectField>

            <TextField
              fullWidth
              floatingLabelText="Antwort"
              onChange={this.handleChange}
              value={this.state.answer}
              errorText={this.state.answerError && 'Bitte geben sie eine Antwort ein'}
            />
            <br/>
            <br/>
            <RaisedButton primary fullWidth label="Abschicken" onClick={this.storeAnswer} />
          </form>
        </Paper>

        <Snackbar
          open={this.state.showSuccessMessage}
          message="Deine Antwort wurde gespeichert! Der nächste ist dran..."
          autoHideDuration={5000}
          onRequestClose={this.hideSuccessMessage}
        />
      </div>
    )
  }
}


export default Answers;

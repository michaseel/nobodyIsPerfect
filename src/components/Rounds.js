import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


import _ from 'lodash';

class Rounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      editRound: 0,
      question: '',
      answer: '',
    }
  }

  handleOpen = (roundId) => () => {
    this.setState({
      dialogOpen: true,
      editRound: roundId,
      question: this.props.rounds[roundId].question,
      answer: this.props.rounds[roundId].answer,
    });
  };

  handleClose = () => {
    this.setState({dialogOpen: false});
  };

  handleSave = () => {
    const { editRound, question, answer } = this.state;
    this.props.setRound(editRound, question, answer);
    this.setState({dialogOpen: false});
  };

  handleChangeQuestion = (event) => {
    this.setState({
      question: event.target.value,
    });
  };

  handleChangeAnswer = (event) => {
    this.setState({
      answer: event.target.value,
    });
  };

  render() {
    const dialogActions = [
      <FlatButton
        label="Abbrechen"
        secondary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Speichern"
        primary
        onTouchTap={this.handleSave}
      />,
    ];

    return (
      <div>
        <h2>Runden</h2>
        <List>
          { this.props.rounds.map((round, key) => (
            <ListItem
              key={key}
              onClick={this.handleOpen(key)}
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
        <Dialog
          title={`Runde ${this.state.editRound+1} bearbeiten`}
          actions={dialogActions}
          modal={true}
          open={this.state.dialogOpen}
        >
          Only actions can close this dialog.
          <TextField
            fullWidth
            floatingLabelText="Frage"
            onChange={this.handleChangeQuestion}
            value={this.state.question}
            errorText={this.state.answerError && 'Bitte geben sie eine Antwort ein'}
          />
          <TextField
            fullWidth
            onChange={this.handleChangeAnswer}
            floatingLabelText="Antwort"
            value={this.state.answer}
            errorText={this.state.answerError && 'Bitte geben sie eine Antwort ein'}
          />
        </Dialog>
        <br/><br/>
        <RaisedButton fullWidth label="Neue Runde hinzufügen" onClick={this.props.createRound} />
      </div>
    );
  }
}

export default Rounds;

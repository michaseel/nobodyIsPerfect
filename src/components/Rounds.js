import React, { Component } from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';

import _ from 'lodash';

const toggleStyle = {
  marginBottom: 16,
};

class Rounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editModalOpen: false,
      controlModalOpen: false,
      editRound: 0,
      question: '',
      answer: '',
    }
  }

  handleEditModalOpen = (roundId) => (e) => {
    e.stopPropagation();
    this.setState({
      editModalOpen: true,
      editRound: roundId,
      question: this.props.rounds[roundId].question,
      answer: this.props.rounds[roundId].answer,
    });
  };

  handleEditModalClose = () => {
    this.setState({ editModalOpen: false });
  };

  handleControlModalOpen = (roundId) => () => {
    this.setState({
      controlModalOpen: true,
      editRound: roundId,
    });
  };

  handleControlModalClose = () => {
    this.setState({ controlModalOpen: false });
  };

  handleEditModalSave = () => {
    const { editRound, question, answer } = this.state;
    this.props.setRound(editRound, question, answer);
    this.setState({editModalOpen: false});
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
    const editModalActions = [
      <FlatButton
        label="Abbrechen"
        secondary
        onTouchTap={this.handleEditModalClose}
      />,
      <FlatButton
        label="Speichern"
        primary
        onTouchTap={this.handleEditModalSave}
      />,
    ];

    return (
      <div>
        <h2>Runden</h2>
        <List>
          { this.props.rounds.map((round, key) => (
            <ListItem
              key={key}
              onClick={this.handleControlModalOpen(key)}
              rightIcon={<IconEdit onClick={this.handleEditModalOpen(key)} />}
              leftAvatar={
                <Avatar
                  backgroundColor={key === this.props.currentRound ? '#00BCD4' : 'gray'}>
                  {key+1}
                </Avatar>
              }
              primaryText={`Runde ${key+1}: ${round.question}`}
              secondaryText={<span style={{color: round.showAnswers ? 'red' : 'gray'}}>
                {_.size(round.answers)} Antworten {round.showAnswers && 'sichtbar'}
              </span>}
            />
          ))
          }
        </List>
        <Dialog
          title={`Runde ${this.state.editRound+1} steuern`}
          actions={[
            <FlatButton
              label="Fertig"
              primary={true}
              onTouchTap={this.handleControlModalClose}
            />
          ]}
          modal={false}
          open={this.state.controlModalOpen}
          onRequestClose={this.handleControlModalClose}
        >
          <Toggle
            label="Runde aktivieren"
            labelPosition="right"
            style={toggleStyle}
            toggled={this.state.editRound === this.props.currentRound}
            onToggle={() => this.props.goToRound(this.state.editRound)}
          />
          <Toggle
            label="Antworten sichtbar"
            labelPosition="right"
            style={toggleStyle}
            toggled={this.props.rounds[this.state.editRound].showAnswers}
            disabled={this.state.editRound !== this.props.currentRound}
            onToggle={() => this.props.showAnswers(this.state.editRound)}
          />
          <Toggle
            label="Schreiber sichtbar"
            labelPosition="right"
            style={toggleStyle}
            disabled={!this.props.rounds[this.state.editRound].showAnswers}
            toggled={this.props.rounds[this.state.editRound].showPlayers}
            onToggle={() => this.props.showPlayers(this.state.editRound)}
          />
        </Dialog>
        <Dialog
          title={`Runde ${this.state.editRound+1} bearbeiten`}
          actions={editModalActions}
          modal={true}
          open={this.state.editModalOpen}
        >
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

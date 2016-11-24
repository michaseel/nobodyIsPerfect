import React, { Component, cloneElement } from 'react';
import Layout from './components/Layout';
import _ from 'lodash';

class App extends Component {

  emptyRound = {
    question: 'Was ist eine Mansube?',
    answer: 'ein kroatischer Reispott',
    points: 0,
    answers: {},
    shuffeledIds: [-1],
    showAnswers: false,
    showPlayers: false,
  };

  constructor(props) {
    super(props);
    const initialState = {
      players: [],
      rounds: [ this.emptyRound ],
      currentRound: 0,
    };
    const parsedState = JSON.parse(localStorage.getItem('state'));
    if (_.isNull(parsedState)) {
      this.state = initialState;
      this.writeStorage();
    } else {
      this.state = parsedState;
    }
  }

  updateState = (event) => {
    if (event.key === 'state') {
      this.setState(JSON.parse(event.newValue))
    }
  };

  writeStorage = () => {
    localStorage.setItem('state', JSON.stringify(this.state));
  };

  createRound = () => {
    const rounds = this.state.rounds;
    rounds.push({...this.emptyRound});
    this.setState({ rounds }, this.writeStorage);
  };

  goToRound = (roundId) => {
    const rounds = this.state.rounds;
    if (_.isUndefined(rounds[roundId])) return new Error('round does not exist');
    this.setState({ currentRound: roundId }, this.writeStorage);
  };

  setRound = (roundId, question, answer) => {
    const rounds = this.state.rounds;
    if (_.isUndefined(rounds[roundId])) return new Error('round does not exist');
    rounds[roundId].question = question;
    rounds[roundId].answer = answer;
    this.setState({ rounds }, this.writeStorage);
  };

  showAnswers = (roundId) => {
    const rounds = this.state.rounds;
    if (_.isUndefined(rounds[roundId])) return new Error('round does not exist');
    rounds[roundId].showAnswers = !rounds[roundId].showAnswers;
    this.setState({ rounds }, this.writeStorage);
  };

  showPlayers = (roundId) => {
    const rounds = this.state.rounds;
    if (_.isUndefined(rounds[roundId])) return new Error('round does not exist');
    rounds[roundId].showPlayers = !rounds[roundId].showPlayers;
    this.setState({ rounds }, this.writeStorage);
  };

  setAnswer = (id, answer) => {
    const rounds = this.state.rounds;
    const currentRound = this.state.currentRound;
    const currentRoundData = rounds[currentRound];
    if (_.isUndefined(currentRoundData)) return new Error('round does not exist');
    currentRoundData.answers[id] = { text: answer, points: 0 };
    const answerIds = _.keys(currentRoundData.answers);
    answerIds.push(-1);
    currentRoundData.shuffeledIds = _.shuffle(answerIds);
    this.setState({ rounds }, this.writeStorage);
  };

  createPlayer = (name) => {
    if (_.isEmpty(name)) return new Error('empty param name');
    const players = this.state.players;
    const newPlayer = {
      name,
      id: Math.round(Math.random() * 100000),
      points: 0,
    };
    players.push(newPlayer);
    this.setState({ players }, this.writeStorage);
  };

  setPlayerPoints = (id, points) => {
    const players = this.state.players;
    const player = _.find(players, player => player.id === id);
    if (_.isUndefined(player)) return new Error('player does not exist');
    player.points+= points;
    const sortedPlayers = _.sortBy(players, ['points', 'id']).reverse();
    this.setState({ players: sortedPlayers }, this.writeStorage);
  };

  deletePlayer = (id) => {
    const players = this.state.players;
    _.remove(players, player => player.id === id);
    this.setState({ players }, this.writeStorage);
  };

  componentDidMount() {
    window.addEventListener('storage', this.updateState);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.updateState);
  }

  render() {
    const { players, rounds, currentRound } = this.state;
    const currentRoundData = rounds[currentRound];
    return (
      <Layout currentRound={currentRound} pathname={this.props.location.pathname}>
        {
          cloneElement(
            this.props.children,
            {
              players,
              rounds,
              currentRound,
              currentRoundData,
              createRound: this.createRound,
              goToRound: this.goToRound,
              setRound: this.setRound,
              showAnswers: this.showAnswers,
              showPlayers: this.showPlayers,
              setAnswer: this.setAnswer,
              createPlayer: this.createPlayer,
              deletePlayer: this.deletePlayer,
              setPlayerPoints: this.setPlayerPoints,
            }
          )
        }
      </Layout>
    );
  }

}

export default App;

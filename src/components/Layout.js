import React, { Component } from 'react';
import Menu from './Menu';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';


const styles = {
  container: {
    // textAlign: 'center',
    paddingBottom: 100,
    maxWidth: 500,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

const headlines = {
  '/results': '- Ergebnisse',
  '/rounds': '- Runden konfigurieren',
  '/players': '- Mitspieler',
  '/answers': '- Antworten eingeben',
  '/': '',
};


class Layout extends Component {
  render() {
    const headline = headlines[this.props.pathname];
    return (
      <div className="Layout">
        <AppBar
          title={'Nobody is Perfect ' + headline }
          iconElementLeft={<Menu />}
          iconElementRight={<Avatar size={35} style={{marginTop: 5}}>{this.props.currentRound + 1}</Avatar>}
        />
        <div style={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;

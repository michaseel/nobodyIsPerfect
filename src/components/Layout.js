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


class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <AppBar
          title="Nobody is Perfect"
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

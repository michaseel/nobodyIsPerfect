import React from 'react';
import { browserHistory } from 'react-router'
import {white} from 'material-ui/styles/colors';

import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import IconPersonAdd from 'material-ui/svg-icons/social/person-add';
import IconAnswer from 'material-ui/svg-icons/action/question-answer';
import IconHome from 'material-ui/svg-icons/action/home';
import IconShow from 'material-ui/svg-icons/image/slideshow';
import IconRound from 'material-ui/svg-icons/image/rotate-left';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Divider from 'material-ui/Divider';

const Menu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MenuIcon color={white} /></IconButton>
    }
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
  >
    <MenuItem onClick={() => browserHistory.push('/players')} primaryText="Spieler" leftIcon={<IconPersonAdd />}/>
    <MenuItem primaryText="Runden"  onClick={() => browserHistory.push('/rounds')} leftIcon={<IconRound />} />
    <Divider />
    <MenuItem primaryText="Antworten"  onClick={() => browserHistory.push('/answers')} leftIcon={<IconAnswer />} />
    <MenuItem primaryText="Ergebnisse" onClick={() => browserHistory.push('/results')} leftIcon={<IconShow />} />
    <Divider />
    <MenuItem primaryText="Anleitung" onClick={() => browserHistory.push('/')} leftIcon={<IconHome />} />
  </IconMenu>
);

export default Menu;

/* eslint-disable import/no-extraneous-dependencies */
import React, { FC, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { awsConfiguration } from '../config/awsConfiguration';
import { setUserName } from '../store/user/action';

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
});

const Header: FC = () => {
  const [title, setTitle] = useState<string>('');
  const [isOpen, setOpen] = useState<boolean>(false);
  const pathName = useLocation().pathname;
  const dispatch = useDispatch();

  useEffect(
    () => {
      switch(pathName) {
        case '/':
          setTitle('ホーム');
          break;
        case '/login':
          setTitle('ログイン');
          break;
        default:
          setTitle('undefined');
      }; 
    }
  );

  const logout = async () => {
    const cognitoUser = userPool.getCurrentUser();

    cognitoUser?.signOut();
    dispatch(setUserName(undefined));
    window.location.href = '/login';
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem key='Home' disablePadding sx={{ display: 'block' }}>
          <ListItemButton component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary='ホーム'/>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key='Logout' disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary='ログアウト'/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  
  return (
    <AppBar position="static" sx={{ flexGrow: 1 }}>
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          {title}
        </Typography>
      </Toolbar>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </AppBar>
  );
}

export default Header;
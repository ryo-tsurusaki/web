import React, { FC } from 'react';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { teal } from "@mui/material/colors";
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { awsConfiguration } from '../config/awsConfiguration';

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
});

const Login: FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const changedEmailHaldler = (e: any) => setEmail(e.target.value);
  const changedPasswordHandler = (e: any) => setPassword(e.target.value);

  const login = () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        console.log(`result: ${result}`);
        const accessToken = result.getAccessToken().getJwtToken();
        console.log(`AccessToken: ${  accessToken}`);
        setEmail('');
        setPassword('');
        console.log('OK, signIn');
      },
      onFailure: (err) => {
        alert('NG, Login please check email, password');
        console.log('NG, signIn:onFailure');
        console.error(err);
      },
    });
  };

  const checkLogin = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      console.log('OK, sign in');
      console.log(cognitoUser);
    } else {
      console.log('not, signing in');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: "70vh",
          width: "280px",
          m: "20px auto"
        }}
      >
        <Grid
          container
          direction="column"
          
          alignItems="center"
        >
          <Avatar sx={{ bgcolor: teal[400] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" sx={{ m: "30px" }}>
            LOGIN
          </Typography>
        </Grid>        
        <TextField
         label="Email"
          variant="standard"
          fullWidth 
          required 
          onChange={changedEmailHaldler}
        />
        <TextField
          type="password"
          label="Password"
          variant="standard"
          fullWidth
          required
          onChange={changedPasswordHandler}
        />
        <Box mt={3}>
          <Button type="submit" color="primary" variant="contained" fullWidth onClick={login}>
            ログイン
          </Button>
          <Typography variant="caption">
            <Link href="#tbd">パスワードを忘れた方はこちら</Link>
          </Typography>
          <Typography variant="caption" display="block">
          <Button type="submit" variant="contained" fullWidth onClick={checkLogin}>
              checkLogin
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

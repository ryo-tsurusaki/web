import React, { FC } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
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

  const signIn = () => {
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
    <div>
      LOGIN
      <TextField
        required
        id="outlined-required"
        label="email"
        onChange={changedEmailHaldler}
      />
      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={changedPasswordHandler}
      />
      <Button variant="outlined" size="large" onClick={signIn}>
        ログイン
      </Button>
      <br />
      <Button variant="outlined" size="large" onClick={checkLogin}>
        checkLogin
      </Button>
    </div>
  );
};

export default Login;

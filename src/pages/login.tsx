/* eslint-disable import/no-extraneous-dependencies */
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { teal } from '@mui/material/colors';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';
import { setUserName } from '../store/user/action';
import { awsConfiguration } from '../config/awsConfiguration';

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
});

const Login: FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isLoginFailed, setIsLoginFailed] = React.useState<boolean>(false);
  const changedEmailHaldler = (e: any) => setEmail(e.target.value);
  const changedPasswordHandler = (e: any) => setPassword(e.target.value);
  const dispatch = useDispatch();

  const login = async () => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        if (cognitoUser) {
          cognitoUser.getSession((error: any) => {
            if (error) {
              setIsLoginFailed(true);
            } else {
              // eslint-disable-next-line no-shadow
              cognitoUser.getUserAttributes((error: any, result: any) => {
                if (error) {
                  setIsLoginFailed(true);
                } else {
                  const currentUserData: { name: string | undefined } = {
                    name: undefined,
                  };
                  for (let i = 0; i < result.length; i += 1) {
                    if (result[i].getName() === 'name') {
                      currentUserData.name = result[i].getValue();
                    }
                  }
                  dispatch(setUserName(currentUserData.name));
                  window.location.href = '/';
                }
              });
            }
          });
        }
      },
      onFailure: () => {
        setIsLoginFailed(true);
      },
    });
  };

  const checkLogin = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      console.log('OK, sign in.');
    } else {
      console.log('not, signing in');
    }
  };

  const logout = async () => {
    const cognitoUser = userPool.getCurrentUser();
    try {
      await cognitoUser?.signOut();
      dispatch(setUserName(undefined));
      console.log('logout success.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          height: '70vh',
          width: '480px',
          m: '40px auto',
        }}
      >
        <Grid container direction="column" alignItems="center">
          <Avatar sx={{ bgcolor: teal[400] }}>
            <LockOutlinedIcon />
          </Avatar>
        </Grid>
        <Box mt={5}>
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
          {isLoginFailed ? (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity="error">
                メールアドレスまたはパスワードに誤りがあります。
              </Alert>
            </Stack>
          ) : (
            ''
          )}
        </Box>
        <Box mt={5}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            onClick={login}
          >
            ログイン
          </Button>
          <Typography variant="caption">
            <Link href="#tbd">パスワードを忘れた方はこちら</Link>
          </Typography>
          <Typography variant="caption" display="block">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={checkLogin}
            >
              checkLogin
            </Button>
          </Typography>

          <Typography mt={1} variant="caption" display="block">
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={logout}
            >
              ログアウト
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;

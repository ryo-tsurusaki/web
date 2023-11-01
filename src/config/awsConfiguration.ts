export const awsConfiguration = {
  region: process.env.REACT_APP_COGNITO_REGION,
  IdentityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID || '',
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || '',
};

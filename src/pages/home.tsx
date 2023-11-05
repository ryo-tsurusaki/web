/* eslint-disable import/no-extraneous-dependencies */
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { RootState } from '../store';

const Home: FC = () => {
  const userState = useSelector((state: RootState) => state.user);
  const [userName] = useState<string|undefined>(userState.name);
  
  return (
    <Box>
      <Typography>ようこそ {userName} さん</Typography>
    </Box>
  );
};

export default Home;

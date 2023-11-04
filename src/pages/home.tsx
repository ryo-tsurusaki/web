import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { RootState } from '../store';

const Home: FC = () => {
  const userState = useSelector((state: RootState) => state.user)
  
  return (
    <div>
      MENU
      <Button variant="outlined" size="large" component={Link} to="/login">
        LOGIN
      </Button>
      <h1>{userState.name}</h1>
    </div>
  );
}

export default Home;

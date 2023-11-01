import { FC } from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: FC = () => (
    <div>
      MENU
      <Button variant="outlined" size="large" component={Link} to="/login">
        LOGIN
      </Button>
    </div>
  );

export default Home;

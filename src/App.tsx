/* eslint-disable import/no-extraneous-dependencies */
import { FC, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { RootState } from './store';
import CommonDrawer from './component/CommonDrawer';
import ErrorBoundary from './pages/errorBoundary';
import Index from './pages/home';
import Login from './pages/login';

const App: FC = () => {
  const pathName = useLocation().pathname;
  const userState = useSelector((state: RootState) => state.user)

  useEffect(
    () => {
      let isLogin = false;
      if (userState.name !== undefined) {
        isLogin = true;
      }

      if (pathName !== '/login' && !isLogin) {
        window.location.href = "/login";
      }
    }
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CommonDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ErrorBoundary>
      </Box>
    </Box>
  );
}

export default App;

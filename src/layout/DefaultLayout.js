import { useContext } from 'react';

import AppContent from './AppContent';
import Sidebar from '../navigation/Sidebar';
import Header from '../navigation/Header';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { store } from '../context/MainContext';

const DefaultLayout = () => {
  const { darkMode } = useContext(store);

  const appliedTheme = createTheme({
    palette: {
      mode: darkMode === true ? 'dark' : 'light',
    },
  });

  return (
    <div>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <AppContent />
      </ThemeProvider>
    </div>
  );
};

export default DefaultLayout;

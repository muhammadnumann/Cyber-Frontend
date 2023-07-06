import React, { useContext, useState } from 'react';
// import Swal from "sweetalert2";
import {
  AppBar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import logoDark from '../assets/header_icon/logo-dark.svg';
import logoLight from '../assets/header_icon/logo-light.svg';
import moon from '../assets/header_icon/moon.svg';
import sun from '../assets/header_icon/sun.svg';
import bellDark from '../assets/header_icon/bell-dark.svg';
import bellLight from '../assets/header_icon/bell-light.svg';

import { header_links } from '../_nav.js';
import { store } from '../context/MainContext';
import UserPanel from './UserPanel';

const Header = () => {
  const { darkMode, setDarkMode } = useContext(store);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar
      position='fixed'
      sx={darkMode === true ? { bgcolor: '#000' } : { bgcolor: '#FFF' }}
      style={{
        boxShadow: 'none',
        borderBottom: '1px solid #DEDEDE',
        height: 60,
        paddingRight: 10,
        justifyContent: 'center',
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box pt={1} pl={4}>
          <Link href='/'>
            <img
              src={darkMode === true ? logoDark : logoLight}
              width='163'
              height='34'
              alt='Shieldriser Logo'
            />
          </Link>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: 'flex', md: 'none' },
            justifyContent: { xs: 'end' },
          }}
        >
          <IconButton
            size='small'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleOpenNavMenu}
            color='primary'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {header_links.map((page, index) => (
              <MenuItem key={index} onClick={handleCloseNavMenu}>
                <Link
                  href={page?.href}
                  className={darkMode === true ? 'Header-light' : 'Header'}
                >
                  <Typography textAlign='center'>{page?.title}</Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box
          justifyContent='flex-end'
          sx={{
            flexGrow: 1,
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'center',
            gap: { md: 1, lg: 2 },
          }}
        >
          {header_links.map((page, index) => (
            <Button
              key={index}
              onClick={handleCloseNavMenu}
              sx={{
                my: 0,
                color: 'white',
                display: 'block',
              }}
              size='small'
            >
              <Link
                href={page?.href}
                className={darkMode === true ? 'Header-light' : 'Header'}
                style={{
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: ' 20px',
                  color: darkMode === true ? '#F5F5F5' : '#1C1C1E',
                }}
              >
                {page?.title}
              </Link>
            </Button>
          ))}
        </Box>

        <img
          src={darkMode === true ? sun : moon}
          width='24'
          height='24'
          onClick={toggleTheme}
          style={{
            cursor: 'pointer',
            marginLeft: '20px',
            marginRight: '10px',
          }}
          alt='Theme Switch'
        />

        <img
          src={darkMode === true ? bellLight : bellDark}
          width='24'
          height='24'
          style={{
            cursor: 'pointer',
            marginLeft: '10px',
            marginRight: '10px',
          }}
          alt='Alert'
        />

        <UserPanel />
      </Box>
    </AppBar>
  );
};

export default React.memo(Header);

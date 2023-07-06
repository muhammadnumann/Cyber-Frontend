import React, { useContext, useState } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { store } from '../context/MainContext';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// ================================================================================
export default function UserPanel() {
  const { darkMode } = useContext(store);
  const user = useSelector((state) => state.Auth.USER);
  const userFirstLetter =
    user?.name?.charAt(0).toUpperCase() ||
    user?.username?.charAt(0).toUpperCase();
  const userName = user?.name || user?.username;
  const userCompany = user?.organization || null;
  const userRole = user?.role;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    fetch('/logout', {
      method: 'POST',
      credentials: 'same-origin',
    })
      .then((res) => {
        document.location.href = '/';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <table
        cellPadding='0'
        className='cursor-pointer'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ marginRight: 20 }}
      >
        <tbody>
          <tr>
            <td>
              <Avatar
                sx={{ bgcolor: '#8C7548', width: 32, height: 32, fontSize: 16 }}
              >
                {userFirstLetter}
              </Avatar>
            </td>
            <td style={{ padding: '0px', paddingLeft: '5px' }}>
              <div style={{ fontSize: 12, fontWeight: 'bold' }}>
                <span style={darkMode ? { color: '#fff' } : { color: '#000' }}>
                  {userName}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'gray' }}>
                {userCompany === null ? <>{userRole}</> : <>{userCompany}</>}
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <Link to='/profile'>Profile</Link>
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

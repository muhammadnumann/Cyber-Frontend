import { useState, useContext } from "react";
import axios from 'axios'
import {
  Typography,
  List,
  ListItem,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  Box,
  Button,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { passwordValidator } from './Validator'
import { store } from '../../context/MainContext'
import {SuccessDialog} from "../../components/Dialog"

export default function UserChangePassword({
  userId,
  setOpenChangePasswordModal,
}) {
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  const {a3m_api_root} = useContext(store)

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword2 = () => setShowPassword2((show2) => !show2);
  const handleMouseDownPassword2 = (event2) => {
    event2.preventDefault();
  };

  const changePassword = () => {
    const data = {
      id: userId,
      password: newPassword,
    }

    const passwordValidatorResult = passwordValidator(newPassword)
    if (passwordValidatorResult) {
      setAlertMessage(passwordValidatorResult)
      setShowAlertMessage(true)
      return
    }

    if (newPassword !== newPassword2) {
      setAlertMessage('Password and repetition does not match')
      setShowAlertMessage(true)
      return
    }

    axios.post(`${a3m_api_root}/auth/api/user/reset-credentials`, data)
      .then((response) => {
        setOpenChangePasswordModal(false)
        SuccessDialog('Change password successfully')
      })
      .catch((error) => {
        console.log(error)
        setAlertMessage('An error occurred')
      })
  }

  return (
    <>
      <Typography variant="h5" gutterBottom textAlign="center">
        Change Password
      </Typography>
      <Typography variant="body">Password Rules</Typography>
      <List sx={{ fontSize: "small" }} disablePadding={true}>
        <ListItem>
          - Password may contain only uppercase (A-Z) letters, lowercase (a-z)
          letters, numbers (0-9), and special characters of .@#$%_&
        </ListItem>
        <ListItem>- Password must be between 8 to 20 characters long</ListItem>
        <ListItem>- Password must contain at least one uppercase</ListItem>
        <ListItem>- Password must contain at least one lowercase</ListItem>
        <ListItem>- Password must contain at least one digit</ListItem>
        <ListItem>
          - Password must contain special characters from .@#$%_&
        </ListItem>
      </List>

      <FormControl variant="outlined" fullWidth size="small" sx={{marginTop:2}}>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e)=> setNewPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl
        variant="outlined"
        fullWidth
        size="small"
        sx={{ marginTop: 1, marginBottom: 1 }}
      >
        <OutlinedInput
          id="outlined-adornment-password2"
          type={showPassword2 ? "text" : "password"}
          placeholder="Enter new password again"
          value={newPassword2}
          onChange={(e)=> setNewPassword2(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword2}
                onMouseDown={handleMouseDownPassword2}
                edge="end"
              >
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Alert
        severity="error"
        sx={{ display: showAlertMessage ? '' : 'none' }}
        onClose={() => {setShowAlertMessage(false)}}
      >
        {alertMessage}
      </Alert>

      <Box textAlign={"right"} mt={1}>
        <Button
          variant="contained"
          sx={{ marginRight: 1 }}
          onClick={() => changePassword()}
        >
          Change Password
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenChangePasswordModal(false)}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
}

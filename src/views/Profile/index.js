import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { store } from "../../context/MainContext";
import {
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  Modal,
} from "@mui/material";
import EditInput from "../../components/EditInput";
import EditSelect from "../../components/EditSelect";
import { countries } from "../../components/Countries";
import { SuccessDialog, ErrorDialog } from "../../components/Dialog";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import PictureUpload from "./PictureUpload";
import UserChangePassword from "./ChangePassword";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFF",
  width: 500,
  border: "1px solid #DEDEDE",
  borderRadius: "10px",
  p: 4,
};

export default function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState({});
  const [firstUserData, setFirstUserData] = useState({});

  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  const { userInfo, a3m_api_root } = useContext(store);
  const userId = parseInt(userInfo?.sub_id);

  useEffect(() => {
    if (userId && userId > 0) {
      axios
        .get(`${a3m_api_root}/auth/api/user/${userId}`)
        .then((result) => {
          setUserData(result.data);
          setFirstUserData(result.data);
          console.log(result.data);
        })
        .catch((err) => console.log(err));
    }
  }, [a3m_api_root, userId]);

  const handleCancel = () => {
    setUserData(firstUserData);
    setIsEdit(false);
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    let checkedData = "username=" + userData?.username;

    if (firstUserData?.username !== userData?.username) {
      axios
        .post(`${a3m_api_root}/check-username`, checkedData)
        .then((result) => {
          if (result.data !== true) {
            ErrorDialog(
              "The username you chose is being used by someone else. Please select another one."
            );
            return;
          }
        })
        .catch((err) => {
          console.log("Kullanıcı adı kontrolü hatası :", err);
          ErrorDialog("An error occurred");
          return;
        });
    }

    const newUserData = {
      id: userId,
      username : userData?.username,
      name : userData?.name,
      lastname : userData?.lastname,
      phone: userData?.phone,
      country_id : userData?.country_id,
      address : userData?.address
    }

    axios
      .put(`${a3m_api_root}/auth/api/user`, newUserData)
      .then((result) => {
        setIsEdit(false);
        setUserData(result.data);
        setFirstUserData(result.data);
        SuccessDialog("User information updated successfully");
      })
      .catch((err) => {
        console.log("Kayıt Hatası :", err);
        ErrorDialog("An error occurred");
        return;
      });
  };

  return (
    <>
      <Modal
        open={openChangePasswordModal}
        onClose={() => setOpenChangePasswordModal(false)}
      >
        <Box sx={style}>
          <UserChangePassword
            userId={userId}
            setOpenChangePasswordModal={setOpenChangePasswordModal}
          />
        </Box>
      </Modal>

      <Grid container>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h5">
            My Profile
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{ display: "flex", justifyContent: "flex-end" }}>
          {isEdit ? (
            <>
              <IconButton color="success" onClick={() => handleSave()}>
                <CheckCircleOutlineIcon />
              </IconButton>

              <IconButton color="error" onClick={() => handleCancel()}>
                <CancelOutlinedIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={() => setIsEdit(true)}>
                <EditOutlinedIcon />
              </IconButton>
            </>
          )}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item sm={12} md={3}>
          {/* <img src={noperson} alt="No person" className="bordered-10" /> */}
          <PictureUpload userId={userId} isEdit={isEdit} />

          {!isEdit && (
            <Box
              className="user-profile-active"
              p={1}
              width="100%"
              textAlign="center"
            >
              {userData?.status?.name}
            </Box>
          )}
        </Grid>
        <Grid item sm={12} md={8}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={4} sx={{ flexGrow: 1 }}>
              <Typography gutterBottom color="GrayText">
                Username
              </Typography>
              <EditInput
                value={userData?.username}
                isEdit={isEdit}
                size="small"
                placeholder="Username"
                fullWidth
                style={{ fontWeight: "bold" }}
                name="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12} md={4} sx={{ flexGrow: 1 }}>
              <Typography gutterBottom color="GrayText">
                E-mail
              </Typography>
              <EditInput
                value={userData?.email}
                isEdit={false}
                size="small"
                placeholder="E-mail"
                fullWidth
                style={{ fontWeight: "bold" }}
                name="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12} md={4} sx={{ flexGrow: 1 }}>
              <Typography gutterBottom color="GrayText">
                Phone
              </Typography>
              <EditInput
                value={userData?.phone}
                isEdit={isEdit}
                size="small"
                placeholder="Phone"
                fullWidth
                style={{ fontWeight: "bold" }}
                name="phone"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} my={2}>
            <Grid item sm={12} md={4} sx={{ flexGrow: 1 }}>
              <Typography gutterBottom color="GrayText">
                Name
              </Typography>
              <EditInput
                value={userData?.name}
                isEdit={isEdit}
                size="small"
                placeholder="Name"
                fullWidth
                style={{ fontWeight: "bold" }}
                name="name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12} md={4} sx={{ flexGrow: 1 }}>
              <Typography gutterBottom color="GrayText">
                Lastname
              </Typography>
              <EditInput
                value={userData?.lastname}
                isEdit={isEdit}
                size="small"
                placeholder="Last Name"
                fullWidth
                style={{ fontWeight: "bold" }}
                name="lastname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item sm={12} md={4} sx={{ flexGrow: 1 }}>
              <Typography gutterBottom color="GrayText">
                Country
              </Typography>
              <EditSelect
                value={userData?.country}
                options={countries}
                isEdit={isEdit}
                size="small"
                placeholder="Country"
                fullWidth
                style={{ fontWeight: "bold" }}
                name="country"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid item sm={12} md={12} sx={{ flexGrow: 1 }}>
              <Typography gutterBottom color="GrayText">
                Address
              </Typography>
              <EditInput
                value={userData?.address}
                isEdit={isEdit}
                size="small"
                placeholder="Address"
                fullWidth
                style={{ fontWeight: "bold" }}
                name="address"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container mt={2} xs={11} spacing={2} pl={2}>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              onClick={() => setOpenChangePasswordModal(true)}
            >
              Change Password
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={3} sx={{ flexGrow: 1 }}>
            <Typography gutterBottom color="GrayText">
              Company
            </Typography>
            <Typography gutterBottom color="GrayText" fontWeight={"bold"}>
              {userData?.organizations?.map((organization, index) => (
                <span key={index}>{organization.name}</span>
              ))}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ flexGrow: 1 }}>
            <Typography gutterBottom color="GrayText">
              Role
            </Typography>
            <Typography gutterBottom color="GrayText" fontWeight={"bold"}>
              {userData?.roles?.map((role, index) => (
                <span key={index}>{role.name}</span>
              ))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

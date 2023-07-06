import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const UserOptions = [
  { label: "Muhammad Usman" },
  { label: "Muhammad Numan" },
  { label: "Muhammad " },
  { label: "Ali" },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #D1D1D6",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
function MainListModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Assign Case
        </Typography>
        <Divider sx={{ background: "#D1D1D6", mt: 2 }} />
        <Box mt={3}>
          <Typography color="GrayText">user</Typography>
          <Autocomplete
            fullWidth={true}
            id="combo-box-demo"
            options={UserOptions}
            className="user-autocomplete"
            sx={{ height: "70px" }}
            renderInput={(params) => <TextField fullWidth={true} {...params} />}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button color={"success"} variant="contained">
            Assign
          </Button>
          <Button className="cancel-btn" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default MainListModal;

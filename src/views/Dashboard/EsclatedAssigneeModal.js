import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import AssigneeIcon from "../../components/icons/AssigneeIcon";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #D1D1D6",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function EsclatedAssigneeModal({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <AssigneeIcon />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure to assign yourself?
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{
            my: 2,
            opacity: 0.5,
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "32px",
          }}
        >
          Assign the case now.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color={"success"} variant="contained">
            ASSIGN
          </Button>
          <Button className="cancel-btn" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EsclatedAssigneeModal;

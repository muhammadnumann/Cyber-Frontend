import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

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

function FeedbackModal({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Give Feedback to Escalated Alert
        </Typography>
        <Divider sx={{ background: "#D1D1D6", mt: 2 }} />
        <Box my={3}>
          <Typography color="GrayText">Feedback</Typography>
          <TextField
            size="small"
            id="Description"
            type="text"
            fullWidth={true}
            placeholder="Lorem ipsum dolor sit amet consectetur. Egestas nibh nec egestas consectetur integer consequat pellentesque. Sit at."
          />
        </Box>

        <Box mt={3} sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button color={"success"} variant="contained">
            Submit
          </Button>
          <Button className="cancel-btn" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default FeedbackModal;

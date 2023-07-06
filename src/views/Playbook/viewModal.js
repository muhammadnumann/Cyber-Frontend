import { Button, Modal } from "@mui/base";
import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
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

function ViewModal({ open, setOpen, data, setview }) {
  const handleClose = () => {
    setview(-1);
    setOpen(false);
  };
  console.log(data);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="custom-modal-heading"
        >
          Playbook: {data.title}
        </Typography>
        <Grid container mt={2}>
          <Grid item xs={4}>
            <span className="modal-subtitle ">Author:</span>

            <span className="modal-subtitle-detail">{data.author_name}</span>
          </Grid>
          <Grid item xs={4}>
            <span className="modal-subtitle "> Case Type:</span>
            <span className="modal-subtitle-detail">{data.case_type}</span>
          </Grid>
          <Grid item xs={4}>
            <span className="modal-subtitle ">Tags:</span>
            <span className="modal-subtitle-detail">Tag1, Tag2</span>
          </Grid>
        </Grid>
        <Divider sx={{ background: "#D1D1D6", mt: 2 }} />
        <Box mt={3}>
          <span className="modal-des">
            Lorem ipsum dolor sit amet consectetur. Amet molestie facilisi diam
            porttitor. Malesuada magna diam felis integer morbi accumsan nisl
            interdum. Amet dapibus neque consectetur mattis ipsum fermentum
            scelerisque sit. Eu habitasse faucibus rhoncus in feugiat. Aliquet
            aliquet et proin rhoncus ornare commodo enim pellentesque. Eu.
          </span>
        </Box>

        <Box mt={3} sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button className="cancel-btn" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ViewModal;

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { SplunkButton } from "..";
import ObservableFeild from "./ObservableFeild";
import TTPsFeilds from "./TTPsFeils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  border: "1px solid #D1D1D6",
  borderRadius: "12px",
  boxShadow: 24,
  overflowY: "auto",
  p: 3,
};

function InvestigationModal({ open, handleClose }) {
  const [selectedButton, setSelectedButton] = useState("Observables");

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Investigate New Case{" "}
        </Typography>
        <Divider sx={{ background: "#D1D1D6", mt: 2 }} />
        <Box mt={3}>
          <ButtonGroup variant="outlined">
            <SplunkButton
              selected={selectedButton === "Observables"}
              onClick={() => setSelectedButton("Observables")}
            >
              Observables
            </SplunkButton>
            <SplunkButton
              selected={selectedButton === "TTPs"}
              onClick={() => setSelectedButton("TTPs")}
            >
              TTPs
            </SplunkButton>
          </ButtonGroup>
        </Box>

        {selectedButton === "Observables" && <ObservableFeild />}
        {selectedButton === "TTPs" && <TTPsFeilds />}

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

export default InvestigationModal;

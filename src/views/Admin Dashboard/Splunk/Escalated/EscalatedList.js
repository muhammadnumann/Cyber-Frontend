import React, { useState } from "react";
import { Box, Grid, Button, Modal, Typography } from "@mui/material";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../../../components/Accordion";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DescriptionDetailIcon from "../../../../components/icons/SeeDetail";
import MainAssigneeIcon from "../../../../components/icons/mainAssigneeIcon";
import AssigneeIcon from "../../../../components/icons/AssigneeIcon";
import data from "../data";
import MessageIcon from "../../../../components/icons/MessageIcon";
import AdminFeedbackModal from "./FeedbackModal";

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
function AdminAccordianDetailSection({ row, open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid
        container
        sx={{ display: "flex", justifyContent: "space-between" }}
        spacing={1}
      >
        <Grid item xs={6} sx={{ flexGrow: 1 }}>
          <table width={"100%"}>
            <tr>
              <td width={"30%"}>Title :</td>
              <td width={"70%"}>{row?.title}</td>
            </tr>
            <tr>
              <td>Severity :</td>
              <td>{row?.severity}</td>
            </tr>
            <tr>
              <td>Assignee :</td>
              <td>{row?.assignee}</td>
            </tr>
            <tr>
              <td>Date :</td>
              <td>{row?.date}</td>
            </tr>
            <tr>
              <td>Details: </td>
              <td>{row?.details}</td>
            </tr>
          </table>
        </Grid>
        <Grid item xs={6} sx={{ flexGrow: 1 }}>
          <table width={"100%"}>
            <tr>
              <td width={"30%"}>Type :</td>
              <td width={"70%"}>{row?.type}</td>
            </tr>
            <tr>
              <td>Value :</td>
              <td>{row?.id}</td>
            </tr>
            <tr>
              <td>Description :</td>
              <td>{row?.description}</td>
            </tr>
          </table>
          <Box mt={2} sx={{ display: "flex", justifyContent: "right" }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<PersonAddAltOutlinedIcon />}
            >
              ASSIGN CASE
            </Button>
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
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

const AdminAccordianSection = ({ row, index }) => {
  const [expanded, setExpanded] = useState("panelx");
  const [open, setOpen] = React.useState(false);
  const [openFeedback, setOpenFeedBack] = React.useState(false);
  const handleChange = (panel) => {
    setExpanded((pre) => {
      return pre !== panel ? panel : "panelx";
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Accordion key={index} expanded={expanded === `panel${index}`}>
        <AccordionSummary>
          <Grid container>
            <Grid item xs={1}>
              <span onClick={() => handleChange(`panel${index}`)}>
                <DescriptionDetailIcon
                  isActive={expanded === `panel${index}`}
                />
              </span>
              <span onClick={() => handleOpen()}>
                <MainAssigneeIcon isActive={open} />
              </span>
              <span
                onClick={() => setOpenFeedBack(true)}
                style={{ marginLeft: "4px" }}
              >
                <MessageIcon isActive={openFeedback} />
              </span>
              <AdminFeedbackModal
                open={openFeedback}
                setOpen={setOpenFeedBack}
              />
            </Grid>
            <Grid item xs={2}>
              {row?.assignee}
            </Grid>
            <Grid item xs={1}>
              {row?.id}
            </Grid>
            <Grid item xs={2}>
              {row?.date}
            </Grid>
            <Grid item xs={2}>
              {row?.rule}
            </Grid>
            <Grid item xs={2}>
              {row?.severity}
            </Grid>
            <Grid item xs={2}>
              {row?.type}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <AdminAccordianDetailSection
            row={row}
            open={open}
            setOpen={setOpen}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default function AdminEscalatedList({ selectedButton }) {
  return (
    <>
      <Box
        sx={{
          border: "1px solid #DEDEDE",
          borderRadius: "10px",
        }}
        pb={5}
      >
        <Grid container p={2} pl={3} sx={{ fontWeight: "bold" }}>
          <Grid item xs={1}>
            Actions
          </Grid>
          <Grid item xs={2}>
            Assignee
          </Grid>
          <Grid item xs={1}>
            Alert ID
          </Grid>
          <Grid item xs={2}>
            Date
          </Grid>
          <Grid item xs={2}>
            Rule
          </Grid>
          <Grid item xs={2}>
            Severity
          </Grid>
          <Grid item xs={2}>
            Attack Type
          </Grid>
        </Grid>
        {data.map((row, index) => (
          <>
            <AdminAccordianSection row={row} index={index} />
          </>
        ))}
      </Box>
    </>
  );
}

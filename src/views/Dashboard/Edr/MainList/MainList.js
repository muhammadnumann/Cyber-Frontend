import React, { useState } from "react";
import { Box, Grid, Button, Tooltip } from "@mui/material";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../../../components/Accordion";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DescriptionDetailIcon from "../../../../components/icons/SeeDetail";
import MainAssigneeIcon from "../../../../components/icons/mainAssigneeIcon";
import data from "../../Splunk/data";
import MainListModal from "../../MainListModal";

function AccordianDetailSection({ row }) {
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
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

const AccordianSection = ({ row, index }) => {
  const [expanded, setExpanded] = useState("panelx");
  const [open, setOpen] = React.useState(false);
  const handleChange = (panel) => {
    setExpanded((pre) => {
      return pre !== panel ? panel : "panelx";
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Accordion key={index} expanded={expanded === `panel${index}`}>
        <AccordionSummary>
          <Grid container>
            <Grid item xs={1}>
              <Tooltip
                disableFocusListener
                disableTouchListener
                title="See Detail"
                variant="solid"
              >
                <span onClick={() => handleChange(`panel${index}`)}>
                  <DescriptionDetailIcon
                    isActive={expanded === `panel${index}`}
                  />
                </span>
              </Tooltip>
              <span onClick={() => handleOpen()}>
                <MainAssigneeIcon isActive={open} />
              </span>
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
          <AccordianDetailSection row={row} open={open} setOpen={setOpen} />
        </AccordionDetails>
      </Accordion>
      <MainListModal open={open} handleClose={handleClose} />
    </>
  );
};
export default function EDRMainList({ selectedButton }) {
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
            <AccordianSection row={row} index={index} />
          </>
        ))}
      </Box>
    </>
  );
}

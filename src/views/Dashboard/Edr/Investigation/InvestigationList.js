import React, { useState } from "react";
import { Box, Grid, Button, Tooltip } from "@mui/material";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../../../components/Accordion";

import InvestigationIcon from "../../../../components/icons/InvestigationIcon";
import InvestigationCaseIcon from "../../../../components/icons/InvestigationCaseIcon";

import data from "../../Splunk/data";
import MainAssigneeIcon2 from "../../../../components/icons/mainAssigneeIcon2";
import DescriptionDetailIconBlue from "../../../../components/icons/SeeDetail2";
import InvestigationModal from "../../InvestigationModal/InvestigationModal";

function AccordianDetailSection(row) {
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
            <Button variant="contained" color="success" sx={{ mr: 2 }}>
              Go PLAYBOOK
            </Button>
            <Button
              className="primary-btn"
              startIcon={<InvestigationCaseIcon />}
            >
              ınvestıgate case
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
const AccordianSection = ({ row, index }) => {
  const [expanded, setExpanded] = useState("panelx");
  const handleChange = (panel) => {
    setExpanded((pre) => {
      return pre !== panel ? panel : "panelx";
    });
  };

  const [openModel, setOpenModel] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModel(true);
  };
  const handleCloseModal = () => setOpenModel(false);
  return (
    <>
      <Accordion key={index} expanded={expanded === `panel${index}`}>
        <AccordionSummary>
          <Grid container>
            <Grid item xs={2}>
              <span onClick={() => handleOpenModal()}>
                <InvestigationIcon isActive={openModel} />
              </span>
              <Tooltip
                disableFocusListener
                disableTouchListener
                title="See Detail"
                variant="solid"
              >
                <span onClick={() => handleChange(`panel${index}`)}>
                  <DescriptionDetailIconBlue
                    isActive={expanded === `panel${index}`}
                  />
                </span>
              </Tooltip>
              <MainAssigneeIcon2 />
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
          <AccordianDetailSection row={row} />
        </AccordionDetails>
      </Accordion>
      <InvestigationModal open={openModel} handleClose={handleCloseModal} />
    </>
  );
};
export default function EDRInvestigationList({ selectedButton }) {
  return (
    <>
      <Box sx={{ border: "1px solid #DEDEDE", borderRadius: "10px" }} pb={5}>
        <Grid container p={2} pl={3} sx={{ fontWeight: "bold" }}>
          <Grid item xs={2}>
            Actions
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

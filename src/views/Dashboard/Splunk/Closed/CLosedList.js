import React, { useState } from "react";
import { Box, Grid, Divider, Tooltip } from "@mui/material";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../../../components/Accordion";

import data from "../data";
import DescriptionDetailIconBlue from "../../../../components/icons/SeeDetail2";

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
              <td width={"30%"}>Alert ID :</td>
              <td width={"70%"}>{row?.title}</td>
            </tr>

            <tr>
              <td>Rule Name :</td>
              <td>{row?.assignee}</td>
            </tr>

            <tr>
              <td>L-2 Feedback: </td>
              <td>{row?.details}</td>
            </tr>
          </table>
        </Grid>
        <Grid item xs={6} sx={{ flexGrow: 1 }}>
          <table width={"100%"}>
            <tr>
              <td>Alert date :</td>
              <td>{row?.severity}</td>
            </tr>

            <tr>
              <td>Status :</td>
              <td>{row?.date}</td>
            </tr>
          </table>
        </Grid>
      </Grid>

      <Box
        mt={2}
        sx={{
          border: "1px solid #DEDEDE",
          borderRadius: "10px",
          maxWidth: "1000px",
        }}
      >
        <Grid container p={1} pl={3} sx={{ fontWeight: "bold" }}>
          <Grid item xs={2}>
            Type
          </Grid>
          <Grid item xs={3}>
            Value
          </Grid>
          <Grid item xs={5}>
            Description
          </Grid>
        </Grid>
        <Divider />
        <Grid container p={1} pl={3}>
          <Grid item xs={2}>
            type
          </Grid>
          <Grid item xs={3}>
            Value
          </Grid>
          <Grid item xs={5}>
            Description
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default function ClosedList({ selectedButton }) {
  const [expanded, setExpanded] = useState("panelx");

  const handleChange = (panel) => {
    setExpanded((pre) => {
      return pre !== panel ? panel : "panelx";
    });
  };

  return (
    <>
      <Box sx={{ border: "1px solid #DEDEDE", borderRadius: "10px" }} pb={5}>
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
                      <DescriptionDetailIconBlue
                        isActive={expanded === `panel${index}`}
                      />
                    </span>
                  </Tooltip>
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
              <AccordianDetailSection row={row} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
}

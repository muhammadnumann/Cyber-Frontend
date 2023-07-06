import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import PauseCircleOutlineOutlinedIcon from "@mui/icons-material/PauseCircleOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "../../components/Accordion";

import {
  perpetualLogList,
  perpetualLogUpdate,
  perpetualLogPlay,
  perpetualLogPause,
} from "../../api/index";

import { ErrorDialog, SuccessDialog } from "../../components/Dialog";
import NewLogType from "./NewLogType";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FFF",
  width: 600,
  border: "1px solid #DEDEDE",
  borderRadius: "10px",
  p: 2,
};

export default function Perpetual() {
  const [expanded, setExpanded] = useState("panelx");
  const [logs, setLogs] = useState([]);
  const [firstLogs, setFirstLogs] = useState([]);
  const [showNewLogModal, setShowNewLogModal] = useState(false);

  useEffect(() => {
    perpetualLogList().then((response) => {
      setLogs(response.data);
      setFirstLogs(response.data);
      // console.log(response.data)
    });
  }, []);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handlePlay = (logId) => {
    perpetualLogPlay(logId);
    updateStatus(logId, "played");
  };

  const handlePause = (logId) => {
    perpetualLogPause(logId);
    updateStatus(logId, "stopped");
  };

  const handleUpdate = (logId, lowerLimit, upperLimit, attackType) => {
    if (attackType === "") {
      ErrorDialog("The attack type cannot be empty");
      return;
    }
    if (lowerLimit === "") {
      ErrorDialog("The lower bound cannot be empty");
      return;
    }
    if (upperLimit === "") {
      ErrorDialog("The upper bound cannot be empty");
      return;
    }
    if (Number(lowerLimit) > Number(upperLimit)) {
      ErrorDialog("The lower bound cannot be greater than the upper bound.");
      return;
    }
    perpetualLogUpdate(logId, lowerLimit, upperLimit, attackType).then(() => {
      SuccessDialog("Perpetual log updated");
      setFirstLogs(logs);
    });
  };

  const handleInputChange = (event, logId, type) => {
    const updatedValue = event.target.value;
    const regex = /^[0-9\b]+$/;

    if (type === "attack_type") {
      setLogs((prevLogs) =>
        prevLogs.map((log) => {
          if (log.id === logId) {
            return {
              ...log,
              attack_type: updatedValue,
            };
          }
          return log;
        })
      );
    } else {
      if (updatedValue === "" || regex.test(updatedValue)) {
        setLogs((prevLogs) =>
          prevLogs.map((log) => {
            if (log.id === logId) {
              return {
                ...log,
                [type]: updatedValue,
              };
            }
            return log;
          })
        );
      }
    }
  };

  const handleInputReset = () => {
    setLogs(firstLogs);
  };

  const updateStatus = (id, newStatus) => {
    setLogs((prevLogs) =>
      prevLogs.map((log) => {
        if (log.id === id) {
          return {
            ...log,
            status: newStatus,
          };
        }
        return log;
      })
    );
  };

  return (
    <>
      <Modal open={showNewLogModal} onClose={() => setShowNewLogModal(false)}>
        <Box sx={style}>
          <NewLogType setShowNewLogModal={setShowNewLogModal} />
        </Box>
      </Modal>

      <Box mb={2}>
        <Typography variant="h5">Perpetual Logs</Typography>
      </Box>
      <Box mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          size="small"
          id="search_word"
          placeholder="Search Perpetual Log Results..."
          sx={{ width: "50%" }}
        />
        <Button variant="contained" color="inherit" size="small" onClick={() => setShowNewLogModal(true)}>
          <AddIcon size="small" /> Add New
        </Button>
      </Box>
      <Box sx={{ border: "1px solid #DEDEDE", borderRadius: "10px" }} pb={1}>
        <Grid container p={2} pl={3} sx={{ fontWeight: "bold" }}>
          <Grid item xs={2}>
            Action
          </Grid>
          <Grid item xs={4}>
            Fake Log Type
          </Grid>
          <Grid item xs={5}>
            Service Mode
          </Grid>
        </Grid>
        {logs.map((log, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary>
              <Grid container>
                <Grid item xs={2}>
                  <IconButton
                    onClick={handleChange(`panel${index}`)}
                    size="small"
                  >
                    <DescriptionOutlinedIcon />
                  </IconButton>

                  <IconButton onClick={() => handlePlay(log?.id)} size="small">
                    <PlayCircleFilledWhiteOutlinedIcon
                      sx={log?.status === "played" ? { color: "green" } : {}}
                    />
                  </IconButton>

                  <IconButton onClick={() => handlePause(log?.id)} size="small">
                    <PauseCircleOutlineOutlinedIcon
                      sx={log?.status === "stopped" ? { color: "red" } : {}}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={4}>
                  {log?.attack_type}
                </Grid>
                <Grid item xs={5}>
                  <span id={`status${log?.id}`}>
                    {log?.status === "played" ? "Running" : "Paused"}
                  </span>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                sx={{ display: "flex", justifyContent: "space-between" }}
                spacing={2}
              >
                <Grid item xs={3} sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom>Fake Log Type</Typography>
                  <TextField
                    size="small"
                    placeholder="Fake Log Type"
                    value={log?.attack_type}
                    onChange={(event) =>
                      handleInputChange(event, log?.id, "attack_type")
                    }
                    fullWidth
                  />
                </Grid>

                <Grid item xs={3} sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom>Attack Lower Bound Time</Typography>
                  <TextField
                    size="small"
                    placeholder="LowerBound Time"
                    value={log?.lower_limit}
                    onChange={(event) =>
                      handleInputChange(event, log?.id, "lower_limit")
                    }
                    fullWidth
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 10,
                    }}
                  />
                </Grid>
                <Grid item xs={3} sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom>Settled Upper Bound Time</Typography>

                  <TextField
                    size="small"
                    placeholder="UpperBound Time"
                    value={log?.upper_limit}
                    onChange={(event) =>
                      handleInputChange(event, log?.id, "upper_limit")
                    }
                    fullWidth
                    inputProps={{
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                      maxLength: 10,
                    }}
                  />
                  <Box mt={2} sx={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: "10px" }}
                      onClick={() =>
                        handleUpdate(
                          log?.id,
                          log?.lower_limit,
                          log?.upper_limit,
                          log?.attack_type
                        )
                      }
                    >
                      SUBMIT
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleInputReset}
                    >
                      RESET
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
}

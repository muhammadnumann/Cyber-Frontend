import React from "react";
import axios from "axios";
import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ErrorDialog, SuccessDialog } from "../../components/Dialog";

export default function ApiTest() {
  const apifirst = "/pub/backend/";
  const apiFakelogfirst = "fakelog/manual/v1/";

  const [selectedApiURL, setSelectedApiURL] = React.useState("");
  const [result, setResult] = React.useState("");

  const handleSelectChange = (event) => {
    setSelectedApiURL(apifirst + apiFakelogfirst + event.target.value + "/1");
  };
  const handleInputChange = (event) => {
    setSelectedApiURL(event.target.value);
  };

  const handlePerpetualSelectChange = (event) => {
    setSelectedApiURL(apifirst + event.target.value);
  };

  const fakelogArray = [
    "bruteforce",
    "nmapscan",
    "xss",
    "sql",
    "bfweb",
    "torip",
    "winlogin",
    "winaudit",
    "whoami",
    "ftgvirus",
    "coldfusion",
    "nessus",
    "ftginternal",
  ];

  const perpetualLogArray = [
    "logs/runningthreads",
    "logs/list",
    "dashboard/fakelogperpetual/play/21",
    "dashboard/fakelogperpetual/pause/21",
  ];

  const testApi = async () => {
    try {
      const response = await axios.get(selectedApiURL);
      console.log(response?.data);
      setResult(
        JSON.stringify(response?.data?.jsonData, null, 2).replace(/\\n/g, "\n")
      );
      SuccessDialog("Check console");
    } catch (error) {
      console.log(error);
      setResult("error");
      ErrorDialog(`Something went wrong`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" gutterBottom mb={2}>
        Endpoints
      </Typography>

      <Grid container spacing={1} mb={2}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel size="small">Log Faker</InputLabel>
            <Select
              value={selectedApiURL}
              onChange={handleSelectChange}
              size="small"
              label="Log Faker"
            >
              {fakelogArray.map((logname, index) => (
                <MenuItem key={index} value={logname}>
                  {logname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel size="small">Perpetual Logs</InputLabel>
            <Select
              value={selectedApiURL}
              onChange={handlePerpetualSelectChange}
              size="small"
              label="Perpetual Logs"
            >
              {perpetualLogArray.map((logname, index) => (
                <MenuItem key={index} value={logname}>
                  {logname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={7}>
          <TextField
            fullWidth
            value={selectedApiURL}
            label="Enter api url"
            size="small"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" onClick={() => testApi()}>
            CHECK
          </Button>
        </Grid>
      </Grid>
      <Box>
        <textarea style={{ width: "100%", height: "500px" }} value={result} />
      </Box>
    </Box>
  );
}

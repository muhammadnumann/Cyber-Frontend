import { useState } from "react";
import {
  TextField,
  Stack,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

export default function SearchBar() {
  const [severityLevel, setSeverityLevel] = useState("low");

  const handleChangeSeverityLevel = (event) => {
    setSeverityLevel(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Stack
        direction="row"
        sx={{
          // flexWrap: "wrap",
          gap: "15px",
          overflowY: "auto",
        }}
      >
        <Box minWidth={150} maxWidth={150}>
          <Typography color="GrayText">Alert ID</Typography>
          <TextField
            size="small"
            id="alertid"
            fullWidth={true}
            placeholder="Alert ID"
          />
        </Box>
        <Box minWidth={150} maxWidth={150}>
          <Typography color="GrayText">Assignee</Typography>
          <TextField
            size="small"
            id="assignee"
            fullWidth={true}
            placeholder="Assignee"
          />
        </Box>
        <Box minWidth={150} maxWidth={150}>
          <Typography color="GrayText">Closed Date</Typography>
          <TextField
            size="small"
            id="closeddate"
            type="date"
            fullWidth={true}
            placeholder="Closed Date"
          />
        </Box>
        <Box minWidth={150} maxWidth={150}>
          <Typography color="GrayText">Rule</Typography>
          <TextField
            size="small"
            id="rule"
            fullWidth={true}
            placeholder="Rule"
          />
        </Box>
        <Box minWidth={150} maxWidth={150}>
          <Typography color="GrayText">Severity</Typography>
          <Select
            size="small"
            id="severity"
            value={severityLevel}
            onChange={handleChangeSeverityLevel}
            fullWidth={true}
            placeholder="Severity"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="critical">Critical</MenuItem>
          </Select>
        </Box>
        <Box minWidth={150} maxWidth={150}>
          <Typography color="GrayText">Attack Type</Typography>
          <TextField
            size="small"
            id="type"
            fullWidth={true}
            placeholder="Attack Type"
          />
        </Box>
      </Stack>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
        pb={1}
        width={"70px"}
      >
        <Typography sx={{ textDecoration: "underline" }} width={"100px"}>
          Clear filters
        </Typography>
      </Box>
    </Box>
  );
}

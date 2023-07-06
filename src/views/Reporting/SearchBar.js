import { TextField, Stack, Box, Typography } from "@mui/material";

export default function ReportingSearchBar() {
  return (
    <Box my={2} sx={{ display: "flex", gap: 2 }}>
      <Stack
        direction="row"
        sx={{
          // flexWrap: "wrap",
          gap: "15px",
          overflowY: "auto",
        }}
      >
        <Box minWidth={150} maxWidth={150}>
          <Typography color="GrayText">Report ID</Typography>
          <TextField
            size="small"
            id="reportid"
            fullWidth={true}
            placeholder="Report ID"
          />
        </Box>
        <Box minWidth={150} maxWidth={150}>
          <Typography color="GrayText">User</Typography>
          <TextField
            size="small"
            id="user"
            fullWidth={true}
            placeholder="user"
          />
        </Box>

        <Box minWidth={150} maxWidth={150}>
          <Typography color="GrayText">Attack Type</Typography>
          <TextField
            size="small"
            id="attacktype"
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

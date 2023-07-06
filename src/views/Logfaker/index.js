import { useState } from "react";
import { Typography, Box, Grid, TextField, Avatar } from "@mui/material";
import { indigo, amber } from "@mui/material/colors";
import { createFakeLog } from "../../api/index";
import { ErrorDialog } from "../../components/Dialog";

const attack_types = [
  {
    title: "BRUTEFORCE ATTACK",
    avatar: "#1",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "NMAPSCAN ATTACK",
    avatar: "#2",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "XSS ATTACK",
    avatar: "#3",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "SQL ATTACK",
    avatar: "#4",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "BFWEB ATTACK",
    avatar: "#5",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "TORiP ATTACK",
    avatar: "#6",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "WiNLOGiN ATTACK",
    avatar: "#7",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "WiNAUDiT ATTACK",
    avatar: "#8",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "WHOAMi ATTACK",
    avatar: "#9",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "FTGViRUS ATTACK",
    avatar: "#10",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "COLDFUSiON ATTACK",
    avatar: "#11",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "NESSUS ATTACK",
    avatar: "#12",
    color: amber[900],
    bgColor: amber[100],
  },
  {
    title: "FTGiNTERNAL ATTACK",
    avatar: "#13",
    color: amber[900],
    bgColor: amber[100],
  },
];

export default function Logfaker() {
  const [newNum, setNewNum] = useState(1);

  const handleClick = (logType) => {
    let num = Number(newNum);
    console.log(isNaN(num));

    if (isNaN(num)) {
      ErrorDialog("You should enter a number");
      setNewNum(1);
      return;
    } else if (!num) {
      num = 1;
    }
    logType = logType.slice(0, logType.indexOf(" ")).toLocaleLowerCase("tr");
    createFakeLog(num, logType);
    setNewNum("");
  };

  return (
    <>
      <Box mb={2}>
        <Typography variant="h5">Log Faker</Typography>
      </Box>
      <div className="custom-card" style={{ paddingBottom: 25 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography gutterBottom>
            Enter the attack number (Default 1)
          </Typography>
          <TextField
            size="small"
            id="attacknumber"
            value={newNum}
            autoFocus
            onChange={(e) => {
              setNewNum(e.target.value);
            }}
          />

          <Typography gutterBottom mt={3}>
            Choose The Attack Type
          </Typography>

          <Grid container spacing={2} px={15}>
            {attack_types.map((attack, index) => (
              <Grid key={index} xs={12} sm={12} md={6} lg={4} item>
                <Box
                  p={2}
                  sx={{
                    border: "1px solid indigo",
                    borderRadius: 3,
                    display: "flex",
                    cursor:'pointer',
                    ":hover": { backgroundColor: '#EDEDED' },
                  }}
                  onClick={() => handleClick(attack?.title)}
                >
                  <Box mr={1}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        fontSize: 22,
                        backgroundColor: indigo[600],
                      }}
                    >
                      {attack?.avatar}
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography fontWeight={"bold"}>{attack?.title}</Typography>
                    Click to Produce Fake Log
                  </Box>
                </Box>
              </Grid>
            ))} 
          </Grid>
        </Box>
      </div>
    </>
  );
}

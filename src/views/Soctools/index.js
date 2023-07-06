import { Typography, Box, Grid } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import link_button from "../../assets/soctools_icon/link_button.svg";

const tools = [
  {
    name: "Cyber SOC Platform",
    link: "dev.soc.shieldriser.com",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    name: "Cyber SOC Platform",
    link: "dev.soc.shieldriser.com",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    name: "Cyber SOC Platform",
    link: "dev.soc.shieldriser.com",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    name: "Cyber SOC Platform",
    link: "dev.soc.shieldriser.com",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    name: "Cyber SOC Platform",
    link: "dev.soc.shieldriser.com",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    name: "Cyber SOC Platform",
    link: "dev.soc.shieldriser.com",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
];

export default function Soctools() {
  return (
    <>
      <Box>
        <Typography variant="h5">SOC Tools Platform</Typography>
      </Box>
      <Grid container spacing={2} pt={5} pr={15}>
        {tools.map((tool, index) => (
          <Grid key={index} item sm={12} md={4}>
              <Box sx={{ flexGrow: 1 }} className="custom-card">
                <Box style={{ display: "flex", alignItems: "center" }} mb={2}>
                  <WorkOutlineIcon sx={{ marginRight: 1 }} />
                  {tool?.name}
                </Box>
                <Box style={{ display: "flex", alignItems: "center" }} mb={2}>
                  <LaunchIcon sx={{ marginRight: 1 }} />
                  {tool?.link}
                </Box>
                <Box style={{ display: "flex", alignItems: "center" }} mb={2}>
                  <HelpOutlineIcon sx={{ marginRight: 1 }} />
                  {tool?.description}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <img src={link_button} width={42} height={42} alt="Go tool" />
                </Box>
              </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

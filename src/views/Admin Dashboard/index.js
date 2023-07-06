import { useState } from "react";
import { Typography, Box, Tabs, Tab } from "@mui/material";

import Edr from "./Edr";
import { store } from "../../context/MainContext";
import { useContext } from "react";
import AdminSplunk from "./Splunk";

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { darkMode } = useContext(store);

  return (
    <>
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          className="main-heading"
          color={`${!darkMode ? "#1C1C1E" : "#F5F5F5"}`}
        >
          Admin Dashboard
        </Typography>
      </Box>

      <Box my={3} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={(event, newValue) => setSelectedTab(newValue)}
        >
          <Tab label="Splunk" />
          <Tab label="EDR" />
        </Tabs>
      </Box>
      {selectedTab === 0 && (
        <Box>
          <AdminSplunk />
        </Box>
      )}
      {selectedTab === 1 && (
        <Box>
          <Edr />
        </Box>
      )}
    </>
  );
}

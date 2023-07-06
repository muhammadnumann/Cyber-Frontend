import { Typography, Box } from "@mui/material";

import { store } from "../../context/MainContext";
import { useContext } from "react";
import ReportingMainList from "./MainList/MainList";
import ReportingSearchBar from "./SearchBar";
import ReportingCharts from "./Charts";

export default function Reporting() {
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
          Reporting
        </Typography>
      </Box>
      <ReportingCharts />

      <ReportingSearchBar />
      <ReportingMainList />
    </>
  );
}

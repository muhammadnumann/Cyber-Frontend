import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { store } from "../../../context/MainContext";
import { useContext } from "react";

const openColor = "#2196F3";
const investigationColor = "#F59E0B";
const closedColor = "#14B8A6";

export default function ReportingChart2() {
  let openCasesCount = 60;
  let investigationCasesCount = 25;
  let closedCasesCount = 15;
  let totalCases = openCasesCount + investigationCasesCount + closedCasesCount;

  let openCasesPercent = (openCasesCount / totalCases) * 100;
  let investigationCasesPercent = (investigationCasesCount / totalCases) * 100;
  let closedCasesPercent = (closedCasesCount / totalCases) * 100;
  const { darkMode } = useContext(store);

  return (
    <>
      <Box mb={1} pb={2} sx={{ borderBottom: "1px solid #D1D1D6" }}>
        <Typography
          variant="h5"
          color={`${!darkMode ? "#1C1C1E" : "#F5F5F5"}`}
          fontSize={20}
          fontWeight={700}
        >
          Case Numbers
        </Typography>
      </Box>
      <Box mb={1} textAlign={"right"}>
        <Typography
          fontSize={"12px"}
          fontWeight={500}
          lineHeight={"16px"}
          color={`${!darkMode ? "#1C1C1E" : "#F5F5F5"}`}
        >
          Total Cases: {totalCases} Cases
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box mb={2}>
          <Typography
            color={`${!darkMode ? "#1C1C1E" : "#F5F5F5"}`}
            fontSize={12}
            fontWeight={400}
          >
            {openCasesCount} Open Cases
          </Typography>
          <OpenBar variant="determinate" value={openCasesPercent} />
        </Box>
        <Box mb={2}>
          <Typography
            color={`${!darkMode ? "#1C1C1E" : "#F5F5F5"}`}
            fontSize={12}
            fontWeight={400}
          >
            {investigationCasesCount} Investigation Cases
          </Typography>
          <InvestigationBar
            variant="determinate"
            value={investigationCasesPercent}
          />
        </Box>
        <Box>
          <Typography
            color={`${!darkMode ? "#1C1C1E" : "#F5F5F5"}`}
            fontSize={12}
            fontWeight={400}
          >
            {closedCasesCount} Closed Cases
          </Typography>
          <ClosedBar variant="determinate" value={closedCasesPercent} />
        </Box>
      </Box>
    </>
  );
}

const OpenBar = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: openColor,
  },
}));

const InvestigationBar = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: investigationColor,
  },
}));

const ClosedBar = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 15,
    backgroundColor: closedColor,
  },
}));

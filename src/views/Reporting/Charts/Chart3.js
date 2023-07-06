import React from "react";
import { Typography, Box } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { store } from "../../../context/MainContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  aspectRatio: 3.5 / 2,
  plugins: {
    legend: {
      display: false,
      fontSize: "9px",
      fontWeight: 400,
      fillStyle: "rgba(28, 28, 30, 0.4)",
    },
  },
  scales: {
    x: {
      grid: {
        drawBorder: false,
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      ticks: {
        stepSize: 20,
      },
    },
  },
};

const labels = ["Malicious", "True Positive", "False Positive", "TP", "FP"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [40, 30, 35, 38, 50],
      backgroundColor: ["#2095F3", "#F59E0B", "#EB5757", "#6366F1", "#219653"],
      barThickness: 20,
      borderRadius: 5,
    },
  ],
};

export default function ReportingChart3() {
  const totalTypes = 80;
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
          Total Types
        </Typography>
      </Box>
      <Box mb={1} textAlign={"right"}>
        <Typography fontSize={"small"}>
          Total Types: {totalTypes} Cases
        </Typography>
      </Box>
      <Box>
        <Bar options={options} data={data} />
      </Box>
    </>
  );
}

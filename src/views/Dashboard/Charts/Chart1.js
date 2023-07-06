import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Typography, Grid, Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useContext } from 'react';
import { store } from '../../../context/MainContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const lowColor = '#14B8A6';
const mediumColor = '#6366F1';
const highColor = '#FACC15';
const criticalColor = '#F59E0B';

const chartStyles = {
  position: 'relative',
};

const labelTextStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
};

const valueTextStyles = {
  fontWeight: 'bold',
  fontSize: '2rem',
};

const data = {
  labels: ['Low', 'Medium', 'High', 'Critical'],
  datasets: [
    {
      label: '# of Levels',
      data: [15, 15, 5, 5],
      backgroundColor: [lowColor, mediumColor, highColor, criticalColor],
      borderColor: ['#fff'],
      spacing: 0,
    },
  ],
};

const options = {
  cutout: '70%', // halkanın kalınlığını belirliyor. İçinden kesilecek miktarı yazıyoruz.
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function Chart1() {
  const totalAlertsText = 'Total Alerts';
  const totalAlertsValue = '40';
  const { darkMode } = useContext(store);

  return (
    <>
      <Box mb={3}>
        <Typography
          variant='h5'
          color={`${!darkMode ? '#1C1C1E' : '#F5F5F5'}`}
          fontSize={20}
          fontWeight={700}
        >
          Severity Levels
        </Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box style={chartStyles}>
            <Doughnut data={data} options={options} />
            <div style={labelTextStyles}>
              <span>{totalAlertsText}</span>
              <br />
              <span style={valueTextStyles}>{totalAlertsValue}</span>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <table>
            <thead>
              <tr style={{ borderBottom: '1px solid gray' }}>
                <td width='10%'>&nbsp;</td>
                <td width='50%'>Levels</td>
                <td width='40%'>Count</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <CircleIcon sx={{ color: lowColor, fontSize: 16 }} />
                </td>
                <td>Low</td>
                <td>15</td>
              </tr>
              <tr>
                <td>
                  <CircleIcon sx={{ color: mediumColor, fontSize: 16 }} />
                </td>
                <td>Medium</td>
                <td>15</td>
              </tr>
              <tr>
                <td>
                  <CircleIcon sx={{ color: highColor, fontSize: 16 }} />
                </td>
                <td>High</td>
                <td>5</td>
              </tr>
              <tr>
                <td>
                  <CircleIcon sx={{ color: criticalColor, fontSize: 16 }} />
                </td>
                <td>Critical</td>
                <td>5</td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </Grid>
    </>
  );
}

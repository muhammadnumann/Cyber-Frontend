import { useState } from 'react';
import {
  Grid,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import ReportingChart3 from './Chart3';
import ReportingChart2 from './Chart2';
import ReportingChart1 from './Chart1';

export default function ReportingCharts() {
  const [openChart1, setOpenChart1] = useState(false);
  const [openChart2, setOpenChart2] = useState(false);
  const [openChart3, setOpenChart3] = useState(false);

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item sm={12} md={4} lg={4}>
            <div
              className='custom-card cursor-pointer'
              onClick={() => setOpenChart1(true)}
            >
              <ReportingChart1 />
            </div>
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <div
              className='custom-card cursor-pointer'
              onClick={() => setOpenChart2(true)}
            >
              <ReportingChart2 />
            </div>
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <div
              className='custom-card cursor-pointer'
              onClick={() => setOpenChart3(true)}
            >
              <ReportingChart3 />
            </div>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={openChart1}
        onClose={() => setOpenChart1(false)}
        fullWidth={true}
        maxWidth='md'
      >
        <DialogContent>
          <DialogContentText>
            <ReportingChart1 />
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* <Modal open={openChart1} onClose={() => setOpenChart1(false)}>
        <Box sx={style}>
          <Chart1 />
        </Box>
      </Modal> */}

      <Dialog
        open={openChart2}
        onClose={() => setOpenChart2(false)}
        fullWidth={true}
        maxWidth='md'
      >
        <DialogContent>
          <DialogContentText>
            <ReportingChart2 />
            <br />
            <br />
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openChart3}
        onClose={() => setOpenChart3(false)}
        fullWidth={true}
        maxWidth='md'
      >
        <DialogContent>
          <DialogContentText>
            <ReportingChart3 />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

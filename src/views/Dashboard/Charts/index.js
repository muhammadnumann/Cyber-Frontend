import { useState } from 'react';
import {
  Grid,
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 600,
//   bgcolor: "background.paper",
//   border: "1px solid #fff",
//   borderRadius: "10px",
//   boxShadow: 24,
//   p: 4,
// };

export default function Charts() {
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
              <Chart1 />
            </div>
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <div
              className='custom-card cursor-pointer'
              onClick={() => setOpenChart2(true)}
            >
              <Chart2 />
            </div>
          </Grid>

          <Grid item sm={12} md={4} lg={4}>
            <div
              className='custom-card cursor-pointer'
              onClick={() => setOpenChart3(true)}
            >
              <Chart3 />
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
            <Chart1 />
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
            <Chart2 />
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
            <Chart3 />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

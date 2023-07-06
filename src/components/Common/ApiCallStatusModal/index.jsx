import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useSelector } from 'react-redux';
import { Stack, Typography } from '@mui/material';

export default function ApiCallStatusModal() {
  const { isModel, modelTitle } = useSelector((state) => state.Loading);
  return (
    <Backdrop
      open={isModel}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
    >
      <Stack spacing={3} direction={'row'} alignItems='center'>
        <CircularProgress size={50} color='inherit' />
        <Typography variant='h4'>{modelTitle}...</Typography>
      </Stack>
    </Backdrop>
  );
}

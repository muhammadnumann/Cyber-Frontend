import React, { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import { SuccessDialog } from '../../components/Dialog';
import { perpetualLogNew } from '../../api/index';

export default function NewLogType({ setShowNewLogModal }) {
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  const [newLog, setNewLog] = useState({
    lower_limit: 0,
    upper_limit: 0,
    attack_type: null,
  });

  const handleInputChange = (event, type) => {
    const updatedValue = event.target.value;
    const regex = /^[0-9\b]+$/;

    if (type === 'attack_type') {
      setNewLog((log) => ({ ...log, attack_type: updatedValue }));
    } else {
      if (updatedValue === '' || regex.test(updatedValue)) {
        setNewLog((log) => ({ ...log, [type]: updatedValue }));
      }
    }
  };

  const handleAddNewLogType = () => {
    if (newLog?.attack_type === '' || newLog?.attack_type === null) {
      setAlertMessage('The attack type cannot be empty');
      setShowAlertMessage(true);
      return;
    }
    if (
      newLog?.lower_limit === '' ||
      newLog?.lower_limit === null ||
      newLog?.lower_limit === 0
    ) {
      setAlertMessage('The lower bound cannot be empty or zero');
      setShowAlertMessage(true);
      return;
    }
    if (
      newLog?.upper_limit === '' ||
      newLog?.upper_limit === null ||
      newLog?.upper_limit === 0
    ) {
      setAlertMessage('The upper bound cannot be empty or zero');
      setShowAlertMessage(true);
      return;
    }
    if (Number(newLog?.lower_limit) > Number(newLog?.upper_limit)) {
      setAlertMessage(
        'The lower bound cannot be greater than the upper bound.'
      );
      setShowAlertMessage(true);
      return;
    }

    // setAlertMessage(JSON.stringify(newLog));
    // setShowAlertMessage(true);
    // return;

    perpetualLogNew(
      newLog?.lower_limit,
      newLog?.upper_limit,
      newLog?.attack_type
    ).then(() => {
      setShowNewLogModal(false);
      SuccessDialog('Perpetual log added');
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h5' sx={{ mb: 2 }}>
          Add New Perpetual Log
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography gutterBottom variant='caption' color='GrayText'>
          Fake Log Type
        </Typography>
        <TextField
          size='small'
          placeholder='Fake Log Type'
          value={newLog?.attack_type}
          onChange={(event) => handleInputChange(event, 'attack_type')}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Typography gutterBottom variant='caption' color='GrayText'>
          Attack Lower Bound Time as Minutes
        </Typography>
        <TextField
          size='small'
          placeholder='LowerBound Time'
          value={newLog?.lower_limit}
          onChange={(event) => handleInputChange(event, 'lower_limit')}
          fullWidth
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 10,
          }}
          sx={{ mb: 2 }}
        />

        <Typography gutterBottom variant='caption' color='GrayText'>
          Settled Upper Bound Time as Minutes
        </Typography>

        <TextField
          size='small'
          placeholder='UpperBound Time'
          value={newLog?.upper_limit}
          onChange={(event) => handleInputChange(event, 'upper_limit')}
          fullWidth
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            maxLength: 10,
          }}
          sx={{ mb: 2 }}
        />
        <Alert
          severity='error'
          sx={{ display: showAlertMessage ? '' : 'none' }}
          onClose={() => {
            setShowAlertMessage(false);
          }}
        >
          {alertMessage}
        </Alert>
        <Box mt={2} sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            variant='contained'
            color='success'
            sx={{ marginRight: '10px' }}
            size='small'
            onClick={() => handleAddNewLogType()}
          >
            Create
          </Button>
          <Button
            variant='contained'
            color='error'
            size='small'
            onClick={() => setShowNewLogModal(false)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
}

import React, { useState } from 'react';
import { Box, Grid, Button, Modal, Typography, Divider } from '@mui/material';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '../../../components/Accordion';

import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import DescriptionDetailIcon from '../../../components/icons/SeeDetail';
import data from '../../Dashboard/Splunk/data';
import MailIcon from '../../../components/icons/MailIcon';
import HtmlEditor from '../../Playbook/HtmlEditor';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #D1D1D6',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};
function AccordianDetailSection({ row, open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid
        container
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        spacing={1}
      >
        <Grid item xs={6} sx={{ flexGrow: 1 }}>
          <table width={'100%'}>
            <thead>
              <tr>
                <td width={'30%'}>Title :</td>
                <td width={'70%'}>{row?.title}</td>
              </tr>
              <tr>
                <td>Severity :</td>
                <td>{row?.severity}</td>
              </tr>
              <tr>
                <td>Assignee :</td>
                <td>{row?.assignee}</td>
              </tr>
              <tr>
                <td>Date :</td>
                <td>{row?.date}</td>
              </tr>
              <tr>
                <td>Details: </td>
                <td>{row?.details}</td>
              </tr>
            </thead>
          </table>
        </Grid>
        <Grid item xs={6} sx={{ flexGrow: 1 }}>
          <table width={'100%'}>
            <tbody>
              <tr>
                <td width={'30%'}>Type :</td>
                <td width={'70%'}>{row?.type}</td>
              </tr>
              <tr>
                <td>Value :</td>
                <td>{row?.id}</td>
              </tr>
              <tr>
                <td>Description :</td>
                <td>{row?.description}</td>
              </tr>
            </tbody>
          </table>
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'right' }}>
            <Button
              variant='contained'
              color='success'
              startIcon={<PersonAddAltOutlinedIcon />}
            >
              ASSIGN CASE
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Send E-Mail to Charles Carmichael{' '}
                </Typography>
                <Divider sx={{ background: '#D1D1D6', mt: 2 }} />
                <Box mt={3}>
                  <Typography color='GrayText'>E-Mail Description</Typography>
                  <HtmlEditor value='<b>Hello World</b>' />
                </Box>

                <Box
                  mt={3}
                  sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}
                >
                  <Button color={'success'} variant='contained'>
                    Submit
                  </Button>
                  <Button className='cancel-btn' onClick={handleClose}>
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

const AccordianSection = ({ row, index }) => {
  const [expanded, setExpanded] = useState('panelx');
  const [open, setOpen] = React.useState(false);
  const handleChange = (panel) => {
    setExpanded((pre) => {
      return pre !== panel ? panel : 'panelx';
    });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Accordion key={index} expanded={expanded === `panel${index}`}>
        <AccordionSummary>
          <Grid container>
            <Grid item xs={1}>
              <span onClick={() => handleChange(`panel${index}`)}>
                <DescriptionDetailIcon
                  isActive={expanded === `panel${index}`}
                />
              </span>
              <span onClick={() => handleOpen()}>
                <MailIcon isActive={open} />
              </span>
            </Grid>
            <Grid item xs={2}>
              {row?.assignee}
            </Grid>
            <Grid item xs={1}>
              {row?.id}
            </Grid>
            <Grid item xs={2}>
              {row?.date}
            </Grid>
            <Grid item xs={2}>
              {row?.rule}
            </Grid>
            <Grid item xs={2}>
              {row?.severity}
            </Grid>
            <Grid item xs={2}>
              {row?.type}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <AccordianDetailSection row={row} open={open} setOpen={setOpen} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
export default function ReportingMainList({ selectedButton }) {
  return (
    <>
      <Box
        sx={{
          border: '1px solid #DEDEDE',
          borderRadius: '10px',
        }}
        pb={5}
      >
        <Grid container p={2} pl={3} sx={{ fontWeight: 'bold' }}>
          <Grid item xs={1}>
            Actions
          </Grid>
          <Grid item xs={2}>
            Assignee
          </Grid>
          <Grid item xs={1}>
            Alert ID
          </Grid>
          <Grid item xs={2}>
            Date
          </Grid>
          <Grid item xs={2}>
            Rule
          </Grid>
          <Grid item xs={2}>
            Severity
          </Grid>
          <Grid item xs={2}>
            Attack Type
          </Grid>
        </Grid>
        {data.map((row, index) => (
          <React.Fragment index={index}>
            <AccordianSection row={row} />
          </React.Fragment>
        ))}
      </Box>
    </>
  );
}

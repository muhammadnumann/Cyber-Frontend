import { Divider, Grid, Typography, Button, Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const style = {
  box: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: '80%',
    bgcolor: 'background.paper',
    p: 4,
    zIndex: 2000,
    borderRadius: '12px',
    border: '1px solid #D1D1D6',
    boxShadow: '0px 0px 30px 0px rgba(132, 132, 132, 0.25)',
  },
  title: {
    fontWeight: 500,
    fontSize: '30px',
    lineHeight: '38px',
  },
  subtitle: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
    color: '#8E8E93',
    marginRight: '6px',
  },
  subtitleDetails: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
};

function PreviewModal({ open, data, handleCloseModel }) {
  return (
    <Modal
      open={open}
      onClose={handleCloseModel}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style.box}>
        <Typography
          id='modal-modal-title'
          variant='h6'
          component='h2'
          sx={style.title}
        >
          Playbook: {data.subject}
        </Typography>
        <Grid container mt={2}>
          <Grid item xs={4}>
            <Typography component='span' sx={style.subtitle}>
              Author:
            </Typography>

            <Typography component='span' sx={style.subtitleDetails}>
              {data.created_by.name ||
                data.created_by.username ||
                data.created_by.email ||
                'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component='span' sx={style.subtitle}>
              {' '}
              Case Type:{' '}
            </Typography>
            <Typography component='span' sx={style.subtitleDetails}>
              {data?.playbookcasetypes.filter((i) => i.casetype).length > 0
                ? data.playbookcasetypes.map((i) => i.casetype.name).join(', ')
                : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography component='span' sx={style.subtitle}>
              Tags:{' '}
            </Typography>
            <Typography component='span' sx={style.subtitleDetails}>
              {data.tags.map((i) => i.tag).join(', ')}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ background: '#D1D1D6', my: 2 }} />
        <Box sx={{ height: 250, overflow: 'hidden', overflowY: 'auto' }}>
          {data.type === 'html' && (
            <Box
              mt={3}
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          )}
          {data.type === 'markdown' && (
            <MDEditor.Markdown
              source={'# This is a header\n\nAnd this is a paragraph'}
              style={{
                color: 'black',
                backgroundColor: 'transparent',
              }}
            />
          )}
        </Box>

        <Box mt={3} sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
          <Button className='cancel-btn' onClick={handleCloseModel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PreviewModal;

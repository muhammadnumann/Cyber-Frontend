import { Typography, Box } from '@mui/material';
import PlaybookForm from './components/PlaybookForm';

export default function PlaybookNew() {
  return (
    <>
      <Box mb={2}>
        <Typography variant='h5 '>Add New Playbook</Typography>
      </Box>
      <Box mb={2}>
        <PlaybookForm />
      </Box>
    </>
  );
}

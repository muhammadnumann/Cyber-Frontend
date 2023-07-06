/* eslint-disable react-hooks/exhaustive-deps */
import { Typography, Box } from '@mui/material';
import PlaybookForm from './components/PlaybookForm';
import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Common/Loading';
import { ErrorDialog } from '../../helper/dialog-alerts';
import { GET_PLAYBOOK_BY_ID } from '../../services/playbook';

export default function PlaybookDetail() {
  let { playbookId } = useParams();
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    const getPlaybookById = async () => {
      try {
        const res = await GET_PLAYBOOK_BY_ID(playbookId);
        setResult({
          ...res.result,
          tags: res.result.tags.map((i) => i.tag),
          playbookcasetypes: res.result.playbookcasetypes.map((caseType) => {
            return caseType.casetypeId;
          }),
        });
        setLoading(true);
      } catch (error) {
        ErrorDialog(error);
      }
    };
    getPlaybookById();
  }, []);

  if (!loading) {
    return <Loading />;
  } else
    return (
      <>
        <Box mb={2}>
          <Typography variant='h5'>Edit Playbook ({result.subject})</Typography>
        </Box>
        <Box mb={2}>
          <PlaybookForm data={result} />
        </Box>
      </>
    );
}

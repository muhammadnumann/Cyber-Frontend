import {
  Typography,
  Box,
  Grid,
  OutlinedInput,
  InputAdornment,
  Stack,
  Button,
} from '@mui/material';

import { FormControl } from '@mui/base';
import SearchIcon from '../../components/icons/SearchIcon';
import DeleteIcon from '../../components/icons/DeleteIcon';
import EyeIcon from '../../components/icons/EyeIcon';
import { useContext, useLayoutEffect, useState } from 'react';
import ViewModal from './PreviewModal';
import { Link } from 'react-router-dom';
import { store } from '../../context/MainContext';
import { ErrorDialog, SuccessDialog } from '../../components/Dialog';
import Loading from '../../components/Common/Loading';
import {
  DELETE_PLAYBOOKS,
  GET_ALL_USER_PLAYBOOKS,
} from '../../services/playbook';
import { WarningDialogWithOKAction } from '../../helper/dialog-alerts';
import { useDispatch } from 'react-redux';
import {
  SET_IS_API_CALLED,
  SET_IS_API_CALLED_FINISHED,
} from '../../store/features/loadingSlice';

const playbooks = [];

const PlaybookStatus = {
  draft: {
    name: 'Draft',
    color: '#636366',
  },
  deleted: {
    name: 'Deleted',
    color: '#FA4D56',
  },
  published: {
    name: 'Published',
    color: '#219653',
  },
};

export default function Playbook() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const { darkMode } = useContext(store);
  const [selectedBook, setSelectedBook] = useState();
  const dispatch = useDispatch();

  const handleDeletePlayBook = async (id) => {
    try {
      dispatch(SET_IS_API_CALLED('Deleting'));
      await DELETE_PLAYBOOKS(id);
      setResult(
        result.map((playBook) => {
          return {
            ...playBook,
            status: playBook.id === id ? 'deleted' : playBook.status,
          };
        })
      );
      SuccessDialog('Playbook Deleted successfully!');
      dispatch(SET_IS_API_CALLED_FINISHED());
    } catch (error) {
      dispatch(SET_IS_API_CALLED_FINISHED());
      ErrorDialog(error);
    }
  };

  const handleDelete = (id) => {
    WarningDialogWithOKAction('Do you want to delete this playbook?', () =>
      handleDeletePlayBook(id)
    );
  };

  useLayoutEffect(() => {
    const fetchAllPlayBooks = async () => {
      try {
        const data = await GET_ALL_USER_PLAYBOOKS();
        setResult(data.result);
        setLoading(true);
      } catch (error) {
        setLoading(true);
        ErrorDialog(error);
      }
    };
    fetchAllPlayBooks();
  }, []);

  if (!loading) {
    return <Loading />;
  } else
    return (
      <>
        <Box mb={2}>
          <Typography variant='h5'>Playbook List View</Typography>
        </Box>
        <Stack
          direction='row'
          sx={{ mb: 2, alignItems: 'center', width: '100%' }}
          spacing={2}
        >
          <Box sx={{ flexGrow: 1 }}>
            <FormControl sx={{ m: 1 }} className='search-bar'>
              <OutlinedInput
                fullWidth
                id='outlined-adornment-amount'
                placeholder='Search Playbook Results...'
                startAdornment={
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          <Box>
            <Link to='/playbook/new'>
              <Button variant='contained'>New</Button>
            </Link>
          </Box>
        </Stack>
        <Box sx={{ border: '1px solid #DEDEDE', borderRadius: '10px' }}>
          <Grid
            container
            p={2}
            pl={3}
            sx={{ fontWeight: 'bold', borderBottom: '1px solid #DEDEDE' }}
          >
            <Grid item xs={2}>
              Actions
            </Grid>
            <Grid item xs={2}>
              Author
            </Grid>
            <Grid item xs={2}>
              Title
            </Grid>
            <Grid item xs={2}>
              Description
            </Grid>
            <Grid item xs={2}>
              Case Type
            </Grid>
            <Grid item xs={2}>
              Status
            </Grid>
          </Grid>
          {result.map((book, index) => (
            <Grid
              container
              p={1}
              pl={3}
              key={book.id}
              sx={
                index + 1 !== playbooks?.length && {
                  borderBottom: '1px solid #DEDEDE',
                }
              }
            >
              <Grid item xs={2}>
                <span
                  className='cursor-pointer'
                  onClick={() => {
                    setSelectedBook(book);
                    setOpen(true);
                  }}
                >
                  <EyeIcon isActive={false} />
                </span>

                <Link to={`/playbook/edit/${book?.id}`}>
                  <svg
                    style={{ margin: '0px 8px' }}
                    xmlns='http://www.w3.org/2000/svg'
                    width={24}
                    height={24}
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z'
                      stroke={darkMode ? '#F5F5F5' : '#1C1C1E'}
                      strokeWidth={2}
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </Link>
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(book?.id)}
                >
                  <DeleteIcon />
                </span>
              </Grid>

              <Grid item xs={2}>
                {book?.created_by?.name || book?.created_by?.username || 'N/A'}
              </Grid>
              <Grid item xs={2}>
                {book?.subject}
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    '& p': {
                      margin: 0,
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: book.description }}
                />
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {book?.playbookcasetypes.filter((i) => i.casetype).length > 0
                  ? book.playbookcasetypes
                      .map((i) => i.casetype.name)
                      .join(', ')
                  : 'N/A'}
              </Grid>
              <Grid item xs={2}>
                <Typography sx={{ color: PlaybookStatus[book?.status].color }}>
                  {PlaybookStatus[book?.status].name}
                </Typography>
              </Grid>
            </Grid>
          ))}
          {open && (
            <ViewModal
              data={selectedBook}
              open={open}
              handleCloseModel={() => setOpen(false)}
            />
          )}
        </Box>
      </>
    );
}

import React, { useLayoutEffect, useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Button,
  FormControl,
  OutlinedInput,
  Chip,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@mui/material';
import MarkdownEditor from '../MarkdownEditor';
import HtmlEditor from '../HtmlEditor';
import TagInput from '../../../components/TagInput';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorDialog, SuccessDialog } from '../../../components/Dialog';
import {
  ADD_NEW_PLAYBOOKS,
  DELETE_PLAYBOOKS,
  UPDATE_PLAYBOOK_BY_ID,
} from '../../../services/playbook';
import { useDispatch, useSelector } from 'react-redux';
import {
  SET_IS_API_CALLED,
  SET_IS_API_CALLED_FINISHED,
} from '../../../store/features/loadingSlice';
import { GET_ALL_CASE_TYPES } from '../../../services/caseTypes';
import Loading from '../../../components/Common/Loading';
import { WarningDialogWithOKAction } from '../../../helper/dialog-alerts';
import ViewModal from '../PreviewModal';
import _ from 'lodash';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const InitialState = {
  createdById: 1,
  subject: '',
  description: '',
  type: 'html',
  tags: [],
  playbookcasetypes: [],
};
export default function PlaybookForm({ data }) {
  const user = useSelector((state) => state.Auth.USER);
  const [playbookType, setPlaybookType] = useState('html');
  const [form, setForm] = useState(data || InitialState);
  const [caseTypes, setCaseTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const getCaseTypes = async () => {
      try {
        const data = await GET_ALL_CASE_TYPES();

        setCaseTypes(
          data.result.map((caseType) => {
            return { casetypeId: caseType.id, name: caseType.name };
          })
        );
        setLoading(true);
      } catch (error) {
        ErrorDialog(error);
      }
    };
    getCaseTypes();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setForm({
      ...form,
      playbookcasetypes: value,
    });
  };

  const handleSubmit = async (status) => {
    try {
      dispatch(SET_IS_API_CALLED(data ? 'Updating' : 'Creating'));
      const FData = {
        ...form,
        status,
        createdById: user.id,
        tags: form.tags.map((tag) => {
          return { tag };
        }),
        playbookcasetypes: form.playbookcasetypes.map((playbookcasetype) => {
          return { casetypeId: playbookcasetype };
        }),
      };
      await ADD_NEW_PLAYBOOKS(FData);
      dispatch(SET_IS_API_CALLED_FINISHED());
      SuccessDialog(`Playbook ${data ? 'Updated' : 'Created'} successfully!`);
      setForm(InitialState);
    } catch (error) {
      dispatch(SET_IS_API_CALLED_FINISHED());
      ErrorDialog(error);
    }
  };

  const handleDeletePlayBook = async () => {
    try {
      dispatch(SET_IS_API_CALLED('Deleting'));
      await DELETE_PLAYBOOKS(data.id);
      SuccessDialog('Playbook Deleted successfully!');

      dispatch(SET_IS_API_CALLED_FINISHED());
      navigate(-1);
    } catch (error) {
      dispatch(SET_IS_API_CALLED_FINISHED());
      ErrorDialog(error);
    }
  };

  const handleDelete = () => {
    WarningDialogWithOKAction(
      'Do you want to delete this playbook?',
      handleDeletePlayBook
    );
  };

  const handleUpdatePlaybook = async () => {
    try {
      console.log('updating');
      dispatch(SET_IS_API_CALLED('Updating'));

      const FData = {
        ..._.omit(form, [
          'id',
          'updatedAt',
          'userId',
          'created_by',
          'createdAt',
        ]),
        tags: form.tags.map((tag) => {
          return { tag };
        }),
        playbookcasetypes: form.playbookcasetypes.map((playbookcasetype) => {
          return { casetypeId: playbookcasetype };
        }),
      };
      await UPDATE_PLAYBOOK_BY_ID(data.id, FData);
      dispatch(SET_IS_API_CALLED_FINISHED());
      // SuccessDialog(`Playbook ${data ? 'Updated' : 'Created'} successfully!`);
    } catch (error) {
      console.log(error);
      dispatch(SET_IS_API_CALLED_FINISHED());
      ErrorDialog(error);
    }
  };

  const handlePreviewToggle = () => setOpen(!open);

  if (!loading) {
    return <Loading />;
  } else
    return (
      <>
        <Box className='custom-card' p={3} mb={5}>
          <Box>
            <InputLabel sx={{ mb: 1.5 }}>Playbook Type</InputLabel>
            <Select
              value={playbookType}
              onChange={(event) => setPlaybookType(event.target.value)}
              size='small'
              fullWidth
            >
              <MenuItem value='html'>HTML</MenuItem>
              <MenuItem value='markdown'>Markdown</MenuItem>
            </Select>
          </Box>
          <Box mt={2}>
            <Grid container spacing={1}>
              <Grid item sm={12} md={6}>
                <InputLabel sx={{ mb: 1.5 }}>Title</InputLabel>
                <TextField
                  size='small'
                  fullWidth
                  placeholder='Playbook Tittle'
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <InputLabel sx={{ mb: 1.5 }}>Author</InputLabel>
                <TextField
                  size='small'
                  fullWidth
                  contentEditable={false}
                  placeholder='Author'
                  value={
                    data
                      ? data?.created_by?.name ||
                        data?.created_by?.username ||
                        'N/A'
                      : user.name || user.username || 'N/A'
                  }
                  disabled={true}
                />
              </Grid>
            </Grid>
          </Box>
          <Box mt={2}>
            <InputLabel sx={{ mb: 1.5 }}>Description</InputLabel>
            {playbookType === 'markdown' && (
              <MarkdownEditor
                value={form.description}
                onChange={(val) => setForm({ ...form, description: val })}
              />
            )}
            {playbookType === 'html' && (
              <HtmlEditor
                value={form.description}
                onChange={(val) => setForm({ ...form, description: val })}
              />
            )}
          </Box>
          <Box mt={3}>
            <InputLabel sx={{ mb: 1.5 }}>Tags</InputLabel>
            <TagInput
              tagList={form.tags || []}
              handleChange={(tags) => {
                console.log(tags);
                setForm({ ...form, tags });
              }}
              theme={
                localStorage.getItem('darkMode') === 'true' ? 'dark' : 'light'
              }
            />
          </Box>
          <Box mt={3}>
            <InputLabel sx={{ mb: 1.5 }}>Case Types</InputLabel>
            <FormControl fullWidth>
              <InputLabel id='case-types-multiselect'>Case Types</InputLabel>
              <Select
                labelId='case-types-multiselect'
                id='case-types-multiselect-chip'
                placeholder='Select Case Types'
                multiple
                value={form.playbookcasetypes}
                onChange={handleChange}
                input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          caseTypes.find((i) => i.casetypeId === value).name
                        }
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value=''>
                  <em>Select Case Type</em>
                </MenuItem>
                {caseTypes.map((item) => {
                  return (
                    <MenuItem key={item.casetypeId} value={item.casetypeId}>
                      <ListItemIcon>
                        <Checkbox
                          checked={form.playbookcasetypes.includes(
                            item.casetypeId
                          )}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          caseTypes.find(
                            (i) => i.casetypeId === item.casetypeId
                          ).name
                        }
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          {data ? (
            <Box mt={3} textAlign='right'>
              <Button
                variant='contained'
                color='success'
                sx={{ marginRight: 1 }}
                onClick={handleUpdatePlaybook}
              >
                UPDATE
              </Button>
              {data.type === 'deleted' || data.type === 'draft' ? (
                <Button
                  variant='contained'
                  sx={{ marginRight: 1 }}
                  onClick={() => handleSubmit('published')}
                >
                  PUBLISH
                </Button>
              ) : (
                <span
                  onClick={() => handleSubmit('draft')}
                  className={
                    localStorage.getItem('darkMode') === 'true'
                      ? 'button-light'
                      : 'button-dark'
                  }
                  style={{ padding: '8px 15px 10px 15px', marginRight: 8 }}
                >
                  SAVE AS DRAFT
                </span>
              )}

              <Button
                variant='contained'
                color='success'
                sx={{ marginRight: 1 }}
                onClick={handlePreviewToggle}
              >
                PREVIEW
              </Button>

              {data.type !== 'deleted' && (
                <Button
                  variant='contained'
                  color='error'
                  sx={{ marginRight: 1 }}
                  onClick={handleDelete}
                >
                  DELETE
                </Button>
              )}

              <Link to='/playbook'>
                <Button variant='contained' color='primary'>
                  Cancel
                </Button>
              </Link>
            </Box>
          ) : (
            <Box mt={3} textAlign='right'>
              <Button
                variant='contained'
                sx={{ marginRight: 1 }}
                onClick={() => handleSubmit('published')}
              >
                PUBLISH
              </Button>
              <Button
                variant='contained'
                color='success'
                sx={{ marginRight: 1 }}
                onClick={handlePreviewToggle}
              >
                PREVIEW
              </Button>
              <span
                onClick={() => handleSubmit('draft')}
                className={
                  localStorage.getItem('darkMode') === 'true'
                    ? 'button-light'
                    : 'button-dark'
                }
                style={{ padding: '8px 15px 10px 15px' }}
              >
                SAVE AS DRAFT
              </span>
              <Link to='/playbook'>
                <Button variant='contained' color='error'>
                  Cancel
                </Button>
              </Link>
            </Box>
          )}
        </Box>
        {open && (
          <ViewModal
            data={data}
            open={open}
            handleCloseModel={handlePreviewToggle}
          />
        )}
      </>
    );
}

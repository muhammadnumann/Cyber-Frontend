import { TextField, InputLabel } from '@mui/material'

const EditInput = (props) => {
  return props?.isEdit ? (
    <TextField {...props} />
  ) : (
    <InputLabel {...props}>{props?.value ? props.value : '-'}</InputLabel>
  )
}
export default EditInput

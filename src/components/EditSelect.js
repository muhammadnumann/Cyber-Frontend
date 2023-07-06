import { InputLabel, Select, MenuItem } from '@mui/material';

const EditSelect = (props) => {
  return props?.isEdit ? (
    <Select {...props}>
      {props?.options?.map((option) => (
        <MenuItem value={option?.value}>{option?.item}</MenuItem>
      ))}
    </Select>
  ) : (
    <InputLabel {...props}>
      {props?.value
        ? props?.options?.find((country) => country.value === props?.value)
            ?.item
        : '-'}
    </InputLabel>
  );
};
export default EditSelect;

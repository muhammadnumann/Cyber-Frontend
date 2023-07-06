import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import EditIcon from "../../../components/icons/EditIcon";
import DeleteIcon from "../../../components/icons/DeleteIcon";

function ModalList({ list }) {
  const [editable, setEditAble] = useState(-1);
  return (
    <>
      <Box mt={2} sx={{ border: "1px solid #DEDEDE", borderRadius: "10px" }}>
        <Grid container p={1} pl={3} sx={{ fontWeight: "bold" }}>
          <Grid item xs={2}>
            Type
          </Grid>
          <Grid item xs={3}>
            Value
          </Grid>
          <Grid item xs={5}>
            Description
          </Grid>
        </Grid>
        <Divider />
        {list.map((row, index) => (
          <Grid container p={1} pl={3}>
            <Grid item xs={2}>
              {editable !== index ? (
                row?.type
              ) : (
                <TextField
                  sx={{ mr: 1 }}
                  className="editable-textfeild"
                  value={row.type}
                />
              )}
            </Grid>
            <Grid item xs={3}>
              {editable !== index ? (
                row?.Value
              ) : (
                <TextField
                  sx={{ mr: 1 }}
                  className="editable-textfeild"
                  value={row.Value}
                />
              )}
            </Grid>
            <Grid item xs={5}>
              {editable !== index ? (
                <Tooltip title="Delete">
                  <span>{row?.Description}</span>
                </Tooltip>
              ) : (
                <TextField
                  sx={{ mr: 1 }}
                  className="editable-textfeild"
                  value={row.Description}
                />
              )}
            </Grid>
            <Grid
              xs={2}
              item
              sx={{
                display: "flex",
                justifyContent: "end",
                gap: 1,
              }}
            >
              <span
                onClick={() => {
                  setEditAble((pre) => (pre !== index ? index : -1));
                }}
                style={{ zIndex: 9999, cursor: "pointer" }}
              >
                <EditIcon />
              </span>
              <span
                style={{ zIndex: 9999, cursor: "pointer" }}
                onClick={() => {
                  list.splice(index, 1);
                }}
              >
                <DeleteIcon />
              </span>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  );
}

function ObservableFeild({ handleClose }) {
  const [type, setType] = useState("");
  const [Value, setValue] = useState("");
  const [Description, setDescription] = useState("");
  const [ObserveArray, setObserveArray] = useState([]);

  const HandleChange = () => {
    if (Value !== "" && Description !== "" && type !== "") {
      setObserveArray([
        ...ObserveArray,
        {
          type: type,
          Description: Description,
          Value: Value,
        },
      ]);
    }
    setType("");
    setValue("");
    setDescription("");
  };
  return (
    <>
      <Box mt={3}>
        <Typography color="GrayText">Type</Typography>
        <Select
          size="small"
          id="Summary"
          type="text"
          fullWidth={true}
          onChange={(e) => {
            console.log(e.target.value);
            setType(e.target.value);
          }}
        >
          <MenuItem defaultChecked value={"Destination-IP"}>
            Destination-IP
          </MenuItem>
          <MenuItem value={"Ip"}>IP</MenuItem>
        </Select>
      </Box>
      <Box mt={3}>
        <Typography color="GrayText">Value</Typography>
        <TextField
          size="small"
          id="IP"
          value={Value}
          type="text"
          fullWidth={true}
          placeholder="192.168.2.2"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Box>
      <Box mt={3}>
        <Typography color="GrayText">Description</Typography>
        <TextField
          size="small"
          id="Description"
          value={Description}
          type="text"
          fullWidth={true}
          placeholder="The case is about implementing new design of dashboard pages into our website"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Box>
      <Box mt={2} sx={{ display: "flex", justifyContent: "end" }}>
        <Button color={"primary"} variant="contained" onClick={HandleChange}>
          add observable
        </Button>
      </Box>
      {ObserveArray.length !== 0 && <ModalList list={ObserveArray} />}
      <Box mt={3}>
        <Typography color="GrayText">Summary</Typography>
        <TextField
          size="small"
          id="Summary"
          type="text"
          fullWidth={true}
          placeholder="Go with the flow and make some change on the dashboard"
        />
      </Box>
      <Box mt={3}>
        <Typography color="GrayText">Status</Typography>
        <Select size="small" id="Summary" type="text" fullWidth={true}>
          <MenuItem defaultChecked value={"false"}>
            False
          </MenuItem>
          <MenuItem value={"true"}>True</MenuItem>
        </Select>
      </Box>
    </>
  );
}

export default ObservableFeild;

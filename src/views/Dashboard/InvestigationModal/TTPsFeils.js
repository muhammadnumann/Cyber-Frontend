import {
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
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
          <Grid item xs={5}>
            Tactic
          </Grid>
          <Grid item xs={5}>
            Technique
          </Grid>
        </Grid>
        <Divider />
        {list.map((row, index) => (
          <Grid container p={1} pl={3}>
            <Grid item xs={5}>
              {editable !== index ? (
                row?.Tactic
              ) : (
                <TextField
                  sx={{ mr: 1 }}
                  className="editable-textfeild"
                  value={row.Tactic}
                />
              )}
            </Grid>
            <Grid item xs={5}>
              {editable !== index ? (
                row?.Technique
              ) : (
                <TextField
                  sx={{ mr: 1 }}
                  className="editable-textfeild"
                  value={row.Technique}
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
                  console.log("Numan");
                  setEditAble(index);
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

function TTPsFeilds() {
  const [Tactic, setTactic] = useState("");
  const [Technique, setTechnique] = useState("");
  const [TPPArray, setTPPArray] = useState([]);

  const HandleChange = () => {
    if (Technique !== "" && Tactic !== "") {
      setTPPArray([
        ...TPPArray,
        {
          Tactic: Tactic,
          Technique: Technique,
        },
      ]);
    }
    setTactic("");
    setTechnique("");
  };
  return (
    <>
      <Box mt={3}>
        <Typography color="GrayText">Tactic</Typography>
        <Select
          size="small"
          id="Summary"
          type="text"
          fullWidth={true}
          onChange={(e) => {
            console.log(e.target.value);
            setTactic(e.target.value);
          }}
        >
          <MenuItem defaultChecked="" value={"Destination-IP"}>
            Executation
          </MenuItem>
          <MenuItem value={"Ip"}>IP</MenuItem>
        </Select>
      </Box>
      <Box mt={3}>
        <Typography color="GrayText">Technique</Typography>
        <TextField
          size="small"
          id="IP"
          value={Technique}
          type="text"
          fullWidth={true}
          placeholder="192.168.2.2"
          onChange={(e) => {
            setTechnique(e.target.value);
          }}
        />
      </Box>

      <Box mt={2} sx={{ display: "flex", justifyContent: "end" }}>
        <Button color={"primary"} variant="contained" onClick={HandleChange}>
          add TPP
        </Button>
      </Box>
      {TPPArray.length !== 0 && <ModalList list={TPPArray} />}
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

export default TTPsFeilds;

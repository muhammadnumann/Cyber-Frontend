import { useState } from "react";
import { ButtonGroup, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import SearchBar from "./SearchBar";
import MainList from "./MainList/MainList";
import ClosedList from "./Closed/CLosedList";
import InvestigationList from "./Investigation/InvestigationList";
import EscalatedList from "./Escalated/EscalatedList";

const SplunkButton = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected
    ? "#8C7548"
    : theme.palette.mode === "light"
    ? "#FFF"
    : "#000",
  color: selected ? "#FFF" : theme.palette.mode === "light" ? "#000" : "#FFF",
  borderColor: "#8C7548",
  "&:hover": {
    backgroundColor: "#8C7548",
    color: "#FFF",
    borderColor: "#8C7548",
  },
  fontSize: "1em",
  textTransform: "none",
  paddingLeft: 30,
  paddingRight: 30,
}));

export default function Splunk() {
  const [selectedButton, setSelectedButton] = useState("main");

  return (
    <>
      <ButtonGroup variant="outlined">
        <SplunkButton
          selected={selectedButton === "main"}
          onClick={() => setSelectedButton("main")}
        >
          Main
        </SplunkButton>
        <SplunkButton
          selected={selectedButton === "investigation"}
          onClick={() => setSelectedButton("investigation")}
        >
          Investigation
        </SplunkButton>
        <SplunkButton
          selected={selectedButton === "closed"}
          onClick={() => setSelectedButton("closed")}
        >
          Closed
        </SplunkButton>
        <SplunkButton
          selected={selectedButton === "escalated"}
          onClick={() => setSelectedButton("escalated")}
        >
          Escalated
        </SplunkButton>
      </ButtonGroup>

      <Box my={2}>
        <SearchBar />
      </Box>

      <div className="bordered-10 cutom-table-width ">
        {selectedButton === "main" && (
          <MainList selectedButton={selectedButton} />
        )}
        {selectedButton === "investigation" && (
          <InvestigationList selectedButton={selectedButton} />
        )}
        {selectedButton === "closed" && (
          <ClosedList selectedButton={selectedButton} />
        )}
        {selectedButton === "escalated" && (
          <EscalatedList selectedButton={selectedButton} />
        )}
      </div>
    </>
  );
}

export { SplunkButton };

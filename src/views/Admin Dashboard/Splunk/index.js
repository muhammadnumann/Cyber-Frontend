import { useState } from "react";
import { ButtonGroup, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import SearchBar from "./SearchBar";
import AdminMainList from "./MainList/MainList";
import AdminClosedList from "./Closed/CLosedList";
import AdminInvestigationList from "./Investigation/InvestigationList";
import AdminEscalatedList from "./Escalated/EscalatedList";

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

export default function AdminSplunk() {
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
          <AdminMainList selectedButton={selectedButton} />
        )}
        {selectedButton === "investigation" && (
          <AdminInvestigationList selectedButton={selectedButton} />
        )}
        {selectedButton === "closed" && (
          <AdminClosedList selectedButton={selectedButton} />
        )}
        {selectedButton === "escalated" && (
          <AdminEscalatedList selectedButton={selectedButton} />
        )}
      </div>
    </>
  );
}

export { SplunkButton };

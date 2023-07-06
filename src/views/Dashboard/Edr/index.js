import { Box, ButtonGroup } from "@mui/material";
import { SplunkButton } from "../Splunk";
import { useState } from "react";
import SearchBar from "../Splunk/SearchBar";
import EDRMainList from "./MainList/MainList";
import EDRInvestigationList from "./Investigation/InvestigationList";
import EDREscalatedList from "./Escalated/EscalatedList";
import EDRClosedList from "./Closed/CLosedList";

export default function Edr() {
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
          <EDRMainList selectedButton={selectedButton} />
        )}
        {selectedButton === "investigation" && (
          <EDRInvestigationList selectedButton={selectedButton} />
        )}
        {selectedButton === "closed" && (
          <EDRClosedList selectedButton={selectedButton} />
        )}
        {selectedButton === "escalated" && (
          <EDREscalatedList selectedButton={selectedButton} />
        )}
      </div>
    </>
  );
}

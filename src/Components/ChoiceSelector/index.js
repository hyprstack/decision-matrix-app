import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Box, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Choice from "../Choice";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
  };
});

function ChoiceSelect(props) {
  const classes = useStyles();
  const [choices, setChoices] = useState([]); // [{choice: "valueC1"},...]

  function updateChoices(val, action, choiceIdx) {
    let updatedChoices = [...choices];
    const exists = updatedChoices[choiceIdx];
    if (action === "update" && exists) {
      updatedChoices[choiceIdx] = val;
    }

    if (action === "remove" && exists) {
      updatedChoices.splice(choiceIdx, 1);
    }

    if (action === "update" && !exists) {
      updatedChoices.push(val);
    }

    return setChoices(updatedChoices);
  }

  return (
    <Box sx={{ ...classes.root }}>
      {choices.map((choice, idx) => {
        return (
          <Choice
            key={`choice-option-${idx}`}
            choiceIdx={idx}
            choice={choice}
            updateChoices={updateChoices}
            removeChoice={updateChoices}
          />
        );
      })}
      <Tooltip title="Add choice">
        <IconButton
          onClick={() => updateChoices({ key: "", value: 0 }, "update")}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ChoiceSelect;

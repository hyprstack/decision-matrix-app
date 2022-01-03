import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Tooltip, Typography, Box } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import Choice from "../Choice";

const useStyles = makeStyles(() => {
  return {
    root: {
      flexGrow: 1,
    },
    navPageButtons: {
      maxWidth: 200,
      marginLeft: "90%",
      marginRight: 4,
      marginTop: 4,
      marginBottom: 4,
      display: "flex",
    },
  };
});

function ChoiceSelector(props) {
  const classes = useStyles();
  const { currentPage, setCurrentPage, variables, choices, setChoices } = props;
  // console.log("Parent props");
  // console.log(props);
  const [choicesPage, setChoicesPage] = useState(0);
  const [disabledNxt, setDisabledNxt] = useState(true);

  useEffect(() => {
    function ensureValidChoices() {
      const invalid = choices.filter((cv) => {
        const { descriptor } = cv;
        return !descriptor || descriptor === "";
      });

      return !invalid.length;
    }

    const isValid = ensureValidChoices();
    isValid ? setDisabledNxt(false) : setDisabledNxt(true);
  }, [setDisabledNxt, choices]);

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
    <Box className={classes.root}>
      {choices.length ? (
        <div>
          <Choice
            choice={choices[choicesPage]}
            choiceIdx={choicesPage}
            updateChoices={updateChoices}
            removeChoice={updateChoices}
          />
          <div className={classes.navPageButtons}>
            <Tooltip title="Previous page">
              <IconButton
                onClick={() => {
                  return choicesPage >= 1
                    ? setChoicesPage(choicesPage - 1)
                    : setCurrentPage(currentPage - 1);
                }}
              >
                <NavigateBeforeIcon color="secondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add another">
              <span>
                <IconButton
                  disabled={disabledNxt}
                  onClick={() => {
                    const exists = choices[choicesPage + 1];

                    if (!exists) {
                      console.log(variables);
                      updateChoices(
                        { variables: [...variables], descriptor: "", total: 0 },
                        "update"
                      );
                    }
                    return setChoicesPage(choicesPage + 1);
                  }}
                >
                  <AddCircleOutlineIcon
                    color={disabledNxt ? "disabled" : "primary"}
                  />
                </IconButton>
              </span>
            </Tooltip>
          </div>
          {choicesPage >= 1 ? (
            <div className={classes.navPageButtons}>
              <Tooltip title="See results">
                <IconButton onClick={() => setCurrentPage(currentPage + 1)}>
                  <DoneAllIcon color={disabledNxt ? "disabled" : "primary"} />
                </IconButton>
              </Tooltip>
            </div>
          ) : null}
        </div>
      ) : null}
    </Box>
  );
}

export default ChoiceSelector;

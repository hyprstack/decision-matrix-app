import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Box, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import Variable from "../Variable";

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

function VariableSelect(props) {
  const classes = useStyles();
  const { variables, setVariables, currentPage, setCurrentPage } = props;
  const [disabledNxt, setDisabledNxt] = useState(true);

  function updateVariables(val, action, variableIdx) {
    let updatedVariables = [...variables];
    const exists = updatedVariables[variableIdx];
    if (action === "update" && exists) {
      updatedVariables[variableIdx] = val;
    }

    if (action === "remove" && exists) {
      updatedVariables.splice(variableIdx, 1);
    }

    if (action === "update" && !exists) {
      updatedVariables.push(val);
    }

    return setVariables(updatedVariables);
  }

  useEffect(() => {
    function ensureValidChoices() {
      const invalid = variables.filter((cv) => {
        const { descriptor } = cv;
        return !descriptor || descriptor === "";
      });

      return !invalid.length;
    }

    const isValid = ensureValidChoices();
    isValid ? setDisabledNxt(false) : setDisabledNxt(true);
  }, [setDisabledNxt, variables]);

  return (
    <Box className={classes.root}>
      {variables.map((variable, idx) => {
        return (
          <Variable
            key={`variable-option-${idx}`}
            variableIdx={idx}
            variable={variable}
            updateVariables={updateVariables}
            removeChoice={updateVariables}
          />
        );
      })}
      <Tooltip title="Add New">
        <IconButton
          onClick={() =>
            updateVariables({ descriptor: "", value: 0 }, "update")
          }
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      {variables.length ? (
        <div className={classes.navPageButtons}>
          <Tooltip title="Next Page">
            <span>
              <IconButton
                disabled={disabledNxt}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <NavigateNextIcon
                  color={disabledNxt ? "disabled" : "primary"}
                />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      ) : null}
    </Box>
  );
}

export default VariableSelect;

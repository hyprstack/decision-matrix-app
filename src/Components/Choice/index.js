import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, Slider, TextField } from "@mui/material";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      margin: 5,
    },
    optionInput: {
      marginLeft: "90%",
      marginRight: 4,
      marginTop: 4,
      marginBottom: 4,
    },
    variablesContainer: {
      display: "contents",
      width: "100%",
    },
    variableDescriptionContainer: {
      width: 25,
      margin: 3,
      paddingTop: 5,
    },
    slider: {
      "&.MuiSlider-root": {
        width: "200px",
      },
    },
    sliderContainer: {
      [theme.breakpoints.up("sm")]: {
        display: "flex",
      },
      display: "contents",
    },
    sliderValue: {
      width: 25,
      margin: 3,
      paddingTop: 5,
    },
  };
});

function Choice(props) {
  const classes = useStyles();
  const {
    updateChoices,
    choiceIdx,
    choice: { userVariables, descriptor, total },
  } = props;

  function calcTotal(v) {
    return v.reduce((acc, cv) => {
      const { value, multiplier } = cv;

      if (!multiplier) {
        return acc;
      }

      return acc + parseInt(value) * parseInt(multiplier);
    }, 0);
  }

  //TODO: maybe make the list a list of components instead and hide with css based on index
  function handleSliderChange(newValue, variableIdx) {
    const _vars = [...userVariables];
    let variable = _vars[variableIdx];
    _vars[variableIdx] = { ...variable, multiplier: newValue };
    const total = calcTotal(_vars);
    return updateChoices(
      { descriptor, userVariables: _vars, total },
      "update",
      choiceIdx
    );
  }

  function handleInputChange(event) {
    const {
      target: { value: key },
    } = event;

    const _vars = [...userVariables];
    return updateChoices(
      { descriptor: key, total, userVariables: _vars },
      "update",
      choiceIdx
    );
  }

  function deleteChoice() {
    return updateChoices(null, "remove", choiceIdx);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} style={{ textAlign: "right" }}>
          <TextField
            className={classes.optionInput}
            id={`outlined-size-small-${choiceIdx}`}
            value={descriptor}
            size="small"
            onChange={handleInputChange}
          />
        </Grid>
        {!descriptor ? null : (
          <>
            {userVariables.map(
              ({ descriptor: varDescription, multiplier = 0 }, variableIdx) => {
                return (
                  <Grid
                    item
                    xs={12}
                    key={`${choiceIdx}-${variableIdx}-variable-key`}
                  >
                    <div className={classes.variablesContainer}>
                      <div className={classes.variableDescriptionContainer}>
                        <Typography
                          className={classes.sliderValue}
                          id={`input-slider-choice-${choiceIdx}-${variableIdx}`}
                          variant="label"
                        >
                          {varDescription}
                        </Typography>
                      </div>
                      <div className={classes.sliderContainer}>
                        <Typography
                          className={classes.sliderValue}
                          id={`input-slider-choice-${choiceIdx}-${variableIdx}`}
                          variant="label"
                        >
                          {multiplier}
                        </Typography>
                        <Slider
                          className={classes.slider}
                          value={multiplier}
                          onChange={(event, newValue) => {
                            return handleSliderChange(newValue, variableIdx);
                          }}
                          aria-labelledby={`input-slider-choice-${choiceIdx}-${variableIdx}`}
                          marks
                          min={0}
                          max={4}
                          step={1}
                        />
                      </div>
                    </div>
                  </Grid>
                );
              }
            )}
          </>
        )}
      </Grid>
    </div>
  );
}

export default Choice;

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
    choice: { variables, descriptor, total },
  } = props;
  // console.log("Child props");
  // console.log(props);

  function calcTotal(v) {
    return v.reduce((acc, cv) => {
      const { value, multiplier } = cv;

      if (!multiplier) {
        return acc;
      }

      return acc + parseInt(value) * parseInt(multiplier);
    }, 0);
  }

  function handleSliderChange(newValue, variableIdx) {
    console.log(newValue, variableIdx);
    const _vars = [...variables];

    console.log(_vars);
    const variable = _vars[variableIdx];
    variable.multiplier = newValue;
    const total = calcTotal(_vars);
    return updateChoices(
      { descriptor, variables: _vars, total },
      "update",
      choiceIdx
    );
  }

  function handleInputChange(event) {
    const {
      target: { value: key },
    } = event;

    const _vars = [...variables];
    return updateChoices(
      { descriptor: key, total, variables: _vars },
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
            {[...variables].map(
              ({ descriptor: varDescription, multiplier = 0 }, variableIdx) => (
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
                        onChange={(event, newValue) =>
                          handleSliderChange(newValue, variableIdx)
                        }
                        aria-labelledby={`input-slider-choice-${choiceIdx}-${variableIdx}`}
                        marks
                        min={0}
                        max={4}
                        step={1}
                      />
                    </div>
                  </div>
                </Grid>
              )
            )}
          </>
        )}
      </Grid>
    </div>
  );
}

export default Choice;

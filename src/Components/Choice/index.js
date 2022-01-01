import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Typography,
  Slider,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
      margin: 5,
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
    choice: { key: propKey, value: propValue },
  } = props;

  function handleSliderChange(event, newValue) {
    updateChoices({ key: propKey, value: newValue }, "update", choiceIdx);
  }

  function handleInputChange(event) {
    const {
      target: { value: key },
    } = event;

    updateChoices({ key, value: propValue }, "update", choiceIdx);
  }

  function removeChoice() {
    updateChoices(null, "remove", choiceIdx);
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          <Tooltip title="remove line">
            <IconButton onClick={() => removeChoice()}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <TextField
            id="outlined-size-small"
            value={propKey}
            size="small"
            onChange={handleInputChange}
          />
        </Grid>
        {!propKey ? null : (
          <Grid item xs>
            <div className={classes.sliderContainer}>
              <Typography
                className={classes.sliderValue}
                id="input-slider"
                variant="label"
              >
                {propValue}
              </Typography>
              <Slider
                value={propValue}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                marks
                min={0}
                max={10}
                step={1}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Choice;

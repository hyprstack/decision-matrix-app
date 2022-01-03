import React from "react";
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

function Variable(props) {
  const classes = useStyles();
  const {
    updateVariables,
    variableIdx,
    variable: { descriptor, value: propValue },
  } = props;

  function handleSliderChange(event, newValue) {
    updateVariables({ descriptor, value: newValue }, "update", variableIdx);
  }

  function handleInputChange(event) {
    const {
      target: { value: key },
    } = event;

    updateVariables(
      { descriptor: key, value: propValue },
      "update",
      variableIdx
    );
  }

  function removeChoice() {
    updateVariables(null, "remove", variableIdx);
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
            value={descriptor}
            size="small"
            onChange={handleInputChange}
          />
        </Grid>
        {!descriptor ? null : (
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
                className={classes.slider}
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

export default Variable;

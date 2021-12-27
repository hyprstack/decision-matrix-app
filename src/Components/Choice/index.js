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
    },
    slider: {
      "&.MuiSlider-root": {
        width: "200px",
      },
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
  const [value, setValue] = useState(propValue || 0);
  const [key, setKey] = useState(propKey || "");
  const [hideSlider, setHideSlider] = useState(true);

  function handleSliderChange(event, newValue) {
    setValue(newValue);
  }

  function handleInputChange(event) {
    const {
      target: { value },
    } = event;

    console.log(!value);
    setHideSlider(!value);
    setKey(value);
  }

  function removeChoice() {
    updateChoices({}, "remove", choiceIdx);
  }

  useEffect(() => {
    if (key) {
      updateChoices({ key: value }, "update", choiceIdx);
    }
  }, [value, key]);

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs>
          <TextField
            id="outlined-size-small"
            value={key}
            size="small"
            onChange={handleInputChange}
          />
        </Grid>
        {hideSlider ? null : (
          <Grid item xs>
            <Slider
              value={typeof value === "number" ? value : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              marks
              min={0}
              max={10}
              step={1}
            />
            <Typography id="input-slider" variant="label">
              {value}
            </Typography>
            <Tooltip title="remove line">
              <IconButton onClick={() => removeChoice()}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Choice;

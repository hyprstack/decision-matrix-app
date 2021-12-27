import React from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: theme.palette.primary.main,
      minHeight: "3em",
      position: "static",
    },
  };
});

function MenuAppBar() {
  const classes = useStyles();

  return (
    <Box sx={{ ...classes.root }}>
      <AppBar className={classes.appBar} />
    </Box>
  );
}

export default MenuAppBar;

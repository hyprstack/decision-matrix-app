import React from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, Tooltip, Box, Typography } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
    titleDiv: {
      width: "100%",
      textAlign: "center",
    },
    decisionMatrixTable: {
      width: "100%",
      display: "contents",
      paddingLeft: "2em",
      paddingRight: "2em",
      alignItems: "center",
    },
    tableContainer: {
      "&.MuiPaper-root": {
        background: "#f0ffff",
      },
    },
    tableHead: {
      "&.MuiTableHead-root": {
        background: theme.palette.primary.main,
      },
    },
    headers: {
      "&.MuiTableCell-head": {
        fontWeight: 700,
      },
    },
    pageActionButtons: {
      maxWidth: 200,
      marginLeft: "90%",
      marginRight: 4,
      marginTop: 4,
      marginBottom: 4,
      display: "flex",
    },
  };
});

function DecisionMatrix(props) {
  const classes = useStyles();
  const { choices, resetChoices } = props;

  function printToPdf() {
    console.log("Print to pdf");
  }

  return (
    <Box className={classes.root}>
      <div className={classes.titleDiv}>
        <Typography variant="h5">Your choices</Typography>
      </div>
      <div className={classes.decisionMatrixTable}>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="matrix-table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell className={classes.headers} align="center">
                  Choice
                </TableCell>
                <TableCell className={classes.headers} align="center">
                  Importance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {choices && choices.length
                ? choices.map(({ descriptor, total }, idx) => {
                    return (
                      <TableRow key={`table-row-${idx}`}>
                        <TableCell align="center">{descriptor}</TableCell>
                        <TableCell align="center">{total}</TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.pageActionButtons}>
        <Tooltip title="Export to pdf">
          <IconButton onClick={() => printToPdf()}>
            <PictureAsPdfIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset">
          <IconButton onClick={() => resetChoices()}>
            <RestartAltIcon color="primary" />
          </IconButton>
        </Tooltip>
      </div>
    </Box>
  );
}

export default DecisionMatrix;

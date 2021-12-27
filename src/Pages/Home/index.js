import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

import ChoiceSelector from "../../Components/ChoiceSelector";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
  };
});

function Home() {
  const classes = useStyles();
  const [options, setOptions] = useState([]); // [{page: "", option: "", pageValues: {choiceKey: "valueC1 * value"}},...]
  const [currentPage, setCurrentPage] = useState("choices");
  return (
    <div className={classes.root}>
      <>{currentPage === "choices" && <ChoiceSelector />}</>
    </div>
  );
}

export default Home;

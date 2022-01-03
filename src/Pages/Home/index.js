import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";

import VariableSelector from "../../Components/VariableSelector";
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
  const [variables, setVariables] = useState([
    { descriptor: "Colour", value: 5 },
    { descriptor: "Brand", value: 7 },
  ]); // [{key: variable, value: "valueV1"},...]
  const [choices, setChoices] = useState([]); // [{descriptor: "", total: 0}, ...]
  const [currentPage, setCurrentPage] = useState(2);

  useEffect(() => {
    if (currentPage === 2 && !choices.length) {
      setChoices([{ variables: [...variables], descriptor: "", total: 0 }]);
    }
  }, [variables, choices, setChoices, currentPage]);

  console.log("Original variables");
  console.log(variables);
  return (
    <div className={classes.root}>
      <>
        {currentPage === 1 && (
          <VariableSelector
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setVariables={setVariables}
            variables={variables}
          />
        )}
        {currentPage === 2 && (
          <ChoiceSelector
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            variables={variables}
            choices={choices}
            setChoices={setChoices}
          />
        )}
      </>
    </div>
  );
}

export default Home;

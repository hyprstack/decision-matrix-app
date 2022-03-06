import React from "react";
import { makeStyles } from "@mui/styles";

import HomeContainer from "../../Containers/Home";
import VariableSelector from "../../Components/VariableSelector";
import ChoiceSelector from "../../Components/ChoiceSelector";
import DecisionMatrix from "../../Components/DecisionMatrix";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      flexGrow: 1,
    },
  };
});

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HomeContainer>
        {({
          variables,
          choices,
          currentPage,
          setCurrentPage,
          setVariables,
          setChoices,
          resetChoices,
        }) => {
          console.log("Choices", choices);
          console.log("Current page", currentPage);
          if (currentPage === 1) {
            return (
              <VariableSelector
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setVariables={setVariables}
                variables={variables}
              />
            );
          }
          if (currentPage === 2) {
            return (
              <ChoiceSelector
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                variables={variables}
                setParentChoices={setChoices}
              />
            );
          }
          if (currentPage === 3) {
            return (
              <DecisionMatrix choices={choices} resetChoices={resetChoices} />
            );
          }

          return null;
        }}
      </HomeContainer>
    </div>
  );
}

export default Home;

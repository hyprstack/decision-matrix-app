import React from "react";

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      variables: [], // [{key: variable, value: "valueV1"},...]
      choices: [], // [{descriptor: "", total: 0}, ...]
      currentPage: 1,
    };
  }

  setCurrentPage(currentPage) {
    this.setState({ currentPage });
  }

  setVariables(variables) {
    this.setState({ variables });
  }

  setChoices(choices) {
    this.setState({ choices });
  }

  reset() {
    this.setState({ currentPage: 1, choices: [], variables: [] });
  }

  render() {
    const { children } = this.props;
    if (!children) {
      return null;
    }

    return children({
      ...this.state,
      setCurrentPage: (p) => this.setCurrentPage(p),
      setVariables: (v) => this.setVariables(v),
      setChoices: (c) => this.setChoices(c),
      resetChoices: () => this.reset(),
    });
  }
}

export default HomeContainer;

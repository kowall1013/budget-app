import { Navigation } from "components";
import { ThemeProvider } from "styled-components";
import React from "react";
import theme from "utils/theme";
import GlobalStyle from "index.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Router>
        <Navigation
          items={[
            { content: "Hompage", to: "/" },
            { content: "Budget", to: "/budget" },
          ]}
        />
        <Switch>
          <Route exact path="/">
            Homepage
          </Route>
          <Route path="/budget">BudgetPage</Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import { Button, LoadingIndicator, Navigation, Wrapper } from "components";
import { ThemeProvider } from "styled-components";
import React, { useEffect } from "react";
import theme from "utils/theme";
import GlobalStyle from "index.css";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { fetchBudge, fetchBudgetedCategories } from "./data/actions/budget.actions";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App({ budget, fetchBudge, fetchBudgetedCategories }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    fetchBudge(1);
    fetchBudgetedCategories(1);
  }, [fetchBudge, fetchBudgetedCategories]);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Navigation
          items={[
            { content: "Hompage", to: "/" },
            { content: "Budget", to: "/budget" },
          ]}
          RightElement={
            <div>
              <Button variant="regular" onClick={() => i18n.changeLanguage("pl")}>
                pl
              </Button>
              <Button variant="regular" onClick={() => i18n.changeLanguage("en")}>
                en
              </Button>
            </div>
          }
        />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              Homepage
            </Route>
            <Route path="/budget">BudgetPage</Route>
          </Switch>
        </Wrapper>
      </Router>
    </>
  );
}

const ConnectedApp = connect(
  (state) => {
    return {
      budget: state.budget.budget,
    };
  },
  {
    fetchBudge,
    fetchBudgetedCategories,
  }
)(App);

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default RootApp;

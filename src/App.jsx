import { Navigation, Wrapper } from "components";
import { ThemeProvider } from "styled-components";
import React from "react";
import theme from "utils/theme";
import GlobalStyle from "index.css";
import { useTranslation } from "react-i18next";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const { i18n } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navigation
          items={[
            { content: "Hompage", to: "/" },
            { content: "Budget", to: "/budget" },
          ]}
          RightElement={
            <div>
              <button onClick={() => i18n.changeLanguage("pl")}>pl</button>
              <button onClick={() => i18n.changeLanguage("en")}>en</button>
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
    </ThemeProvider>
  );
}

function RootApp() {
  return (
    <React.Suspense fallback="...Loading">
      <App />
    </React.Suspense>
  );
}

export default RootApp;

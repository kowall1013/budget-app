import { Button, LoadingIndicator, Navigation, Wrapper } from "components";
import { ThemeProvider } from "styled-components";
import React from "react";
import theme from "utils/theme";
import GlobalStyle from "index.css";
import { useTranslation } from "react-i18next";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const { i18n } = useTranslation();

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

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <App />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default RootApp;

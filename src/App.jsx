import { Button, LoadingIndicator, Navigation, Wrapper } from "components";
import { ThemeProvider } from "styled-components";
import React from "react";
import theme from "utils/theme";
import GlobalStyle from "index.css";
import { useTranslation } from "react-i18next";
import { ReactQueryConfigProvider } from "react-query";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Budget from "./pages/Budget";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Super biblioteka do wyświetlania notyfikacji
//styled-components
//redux
//redux middlewares
//Portals
//lazy + suspense
//react.memo
//react-final-form
//react-query
//context api
//json-server

//zadanie
//1.Stworzenie paginacji dla transkacji (json server wspiera to) nawet react-query pozwala nam to
//2.Możliwość stworzenia zarządzania
//3.Wyświetlanie ststaystyk w budżecie
//4.zMIANA KATEGORI (ROBIMY REQUEST PUT NA dany adres)
//5.usówanie transakcji
//6. Możliwość kopiowanie budżetów
toast.configure();

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
            <Route path="/budget">
              <Budget />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </>
  );
}

const queryConfig = {
  suspense: true,
  refetchAllOnWindowFocus: false,
};

function RootApp() {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<LoadingIndicator />}>
          <App />
        </React.Suspense>
      </ThemeProvider>
    </ReactQueryConfigProvider>
  );
}

export default RootApp;

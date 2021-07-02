import React, { useState } from "react";

import { Grid } from "./Budget.css";
import { Modal, Button, SuspenseErrorBoundary } from "components";

import { Route, Switch } from "react-router-dom";
import BudgetContext from "data/context/budget.context";

import { TransactionDetails } from "./components/transactionDetails";

//Dzięki React.lazy ładujemy chunk.js, czyli pliki JavaScriptowe w momencie, kiedy użytkownik ich na prawdę potrzebuje. Nie ładujemy ich wszystkich od razu na początku, tylko wtedy, gdy użytkownik wejdzie na daną stronę. Fajne dla optymalizacji

//Na tym właśnie polega Code Splitting, czyli na dzieleniu całego codebasu, na małe części

//Trzeba pamiętać, że komponent który jest ładownay za pomocą React.lazy, musi byc owinięty za pomocą Suspensa
const BudgetTransactionList = React.lazy(() => import("pages/Budget/components/budgetTransactionList"));
const BudgetCategoryList = React.lazy(() => import("pages/Budget/components/budgetCategoryList"));
const AddTransactionView = React.lazy(() => import("pages/Budget/components/addTransactionForm"));

function Budget({ addTransaction, transactions }) {
  //Omówienie React Suspense "Poprawa indykatorów ładowania", od 2 minuty

  const [showTransactions, setShowTransactions] = useState();

  return (
    <BudgetContext.BudgetProvider>
      <Grid>
        <section>
          <SuspenseErrorBoundary>
            <BudgetCategoryList />
          </SuspenseErrorBoundary>
        </section>
        <section>
          <SuspenseErrorBoundary>
            <Button to="/budget/transactions/new">Add new transaction</Button>
            <Button onClick={() => setShowTransactions(!showTransactions)}>
              {showTransactions ? "Hide Transactions" : "Show Transactions"}
            </Button>
            {showTransactions && <BudgetTransactionList />}
          </SuspenseErrorBoundary>
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transactions/new">
          <Modal>
            <AddTransactionView />
          </Modal>
        </Route>
        <Route path="/budget/transactions/:id">
          <Modal>
            <TransactionDetails transactions={transactions} />
          </Modal>
        </Route>
      </Switch>
    </BudgetContext.BudgetProvider>
  );
}

export default Budget;

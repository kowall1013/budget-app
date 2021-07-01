import React from "react";
import { connect } from "react-redux";

import { Grid } from "./Budget.css";
import { Modal, Button, SuspenseErrorBoundary } from "components";
import BudgetCategoryList from "pages/Budget/components/budgetCategoryList";
import BudgetTransactionList from "pages/Budget/components/budgetTransactionList";
import { Route, Switch } from "react-router-dom";

import { TransactionDetails } from "./components/transactionDetails";
import AddTransactionView from "pages/Budget/components/addTransactionForm";

function Budget({ addTransaction, transactions }) {
  //Omówienie React Suspense "Poprawa indykatorów ładowania", od 2 minuty

  return (
    <>
      <Grid>
        <section>
          <SuspenseErrorBoundary>
            <BudgetCategoryList />
          </SuspenseErrorBoundary>
        </section>
        <section>
          <SuspenseErrorBoundary>
            <Button to="/budget/transactions/new">Add new transaction</Button>
            <BudgetTransactionList />
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
    </>
  );
}

export default Budget;

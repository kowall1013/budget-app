import React, { useMemo } from "react";
import { connect } from "react-redux";
import { addTransaction } from "data/actions/budget.actions";

import { Grid } from "./Budget.css";
import { Modal, Button, LoadingIndicator, SuspenseErrorBoundary } from "components";
import BudgetCategoryList from "pages/Budget/components/budgetCategoryList";
import BudgetTransactionList from "pages/Budget/components/budgetTransactionList";
import { Route, Switch, useHistory } from "react-router-dom";
import AddTransactionForm from "pages/Budget/components/addTransactionForm";

import { TransactionDetails } from "./components/transactionDetails";

function Budget({ commonState, budgetState, allCategories, addTransaction, budget, transactions }) {
  const history = useHistory();

  const isLoaded = useMemo(
    () =>
      !!commonState && Object.keys(commonState).length === 0 && !!budgetState && Object.keys(budgetState).length === 0,
    [commonState, budgetState]
  );

  const handleSubmitAddTransaction = (values) => {
    addTransaction({
      budgetId: budget.id,
      data: values,
    }).then(() => {
      history.goBack();
    });
  };

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
            <AddTransactionForm
              categories={allCategories}
              groupCategoryBy="parentCategory.name"
              onSubmit={handleSubmitAddTransaction}
            />
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

export default connect(
  (state) => {
    return {
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
      allCategories: state.common.allCategories,
      transactions: state.budget.budget.transactions,
    };
  },
  {
    addTransaction,
  }
)(Budget);

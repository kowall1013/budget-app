import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { fetchBudge, fetchBudgetedCategories } from "data/actions/budget.actions";
import { fetchAllCategories } from "data/actions/common.actions";
import { Grid } from "./Budget.css";
import { LoadingIndicator, Modal, Button } from "components";
import BudgetCategoryList from "pages/Budget/components/budgetCategoryList";
import BudgetTransactionList from "pages/Budget/components/budgetTransactionList";
import { Route, Switch } from "react-router";
import AddTransactionForm from "pages/Budget/components/addTransactionForm";

function Budget({ fetchBudge, fetchBudgetedCategories, fetchAllCategories, commonState, budgetState, allCategories }) {
  useEffect(() => {
    fetchBudge(1);
    fetchBudgetedCategories(1);
    fetchAllCategories();
  }, [fetchBudge, fetchBudgetedCategories, fetchAllCategories]);

  const isLoaded = useMemo(
    () =>
      !!commonState && Object.keys(commonState).length === 0 && !!budgetState && Object.keys(budgetState).length === 0,
    [commonState, budgetState]
  );

  return (
    <>
      <Grid>
        <section>
          {isLoaded ? (
            <>
              <Button to="/budget/transactions/new">Add new transaction</Button>
              <BudgetCategoryList />
            </>
          ) : (
            <LoadingIndicator />
          )}
        </section>
        <section>{isLoaded ? <BudgetTransactionList /> : <LoadingIndicator />}</section>
      </Grid>
      <Switch>
        <Route path="/budget/transactions/new">
          <Modal>
            <AddTransactionForm categories={allCategories} groupCategoryBy="parentCategory.name" />
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
    };
  },
  {
    fetchBudge,
    fetchBudgetedCategories,
    fetchAllCategories,
  }
)(Budget);

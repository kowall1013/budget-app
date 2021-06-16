import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { fetchBudge, fetchBudgetedCategories } from "data/actions/budget.actions";
import { fetchAllCategories } from "data/actions/common.actions";
import { Grid } from "./Budget.css";
import { LoadingIndicator } from "components";

function Budget({ fetchBudge, fetchBudgetedCategories, fetchAllCategories, commonState, budgetState }) {
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
    <Grid>
      <section>{isLoaded ? "Category List" : <LoadingIndicator />}</section>
      <section>{isLoaded ? "Transaction List" : <LoadingIndicator />}</section>
    </Grid>
  );
}

export default connect(
  (state) => {
    return {
      budget: state.budget.budget,
      commonState: state.common.loadingState,
      budgetState: state.budget.loadingState,
    };
  },
  {
    fetchBudge,
    fetchBudgetedCategories,
    fetchAllCategories,
  }
)(Budget);
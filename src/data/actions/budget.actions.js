import {
  BUDGET_GET,
  BUDGETED_CATEGORIES_GET,
  SET_SELECTED_PARENT_CATEGORY_ID,
  BUDGET_TRANSACTION_ADD,
} from "../constants";

import API from "data/fetch";

export const fetchBudge = (id) => {
  const promise = API.budget.fetchBudget({ id });

  return {
    type: BUDGET_GET,
    promise,
  };
};

export const fetchBudgetedCategories = (id) => {
  const promise = API.budget.fetchBudgetCategories(id);

  return {
    type: BUDGETED_CATEGORIES_GET,
    promise,
  };
};

export const selectParentCategory = (id) => {
  return {
    type: SET_SELECTED_PARENT_CATEGORY_ID,
    payload: id,
  };
};

export const addTransaction = ({ budgetId, data }) => {
  const promise = API.budget.addTransaction({ budgetId, data });

  return {
    type: BUDGET_TRANSACTION_ADD,
    promise,
    successMessage: "Add new transaction !",
  };
};

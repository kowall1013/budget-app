import { BUDGET_GET, BUDGETED_CATEGORIES_GET } from "../constants";

import API from "../fetch";

export const fetchBudge = (id) => {
  const promise = API.budget.fetchBudget(id);

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

import React from "react";
import { useQuery, useMutation } from "react-query";

import API from "data/fetch";
import { useHistory } from "react-router-dom";
import AddTransactionForm from "./AddTransactionForm";

function AddTransactionView() {
  const { data: budget } = useQuery(["budget", { id: 1 }], API.budget.fetchBudget);
  const { data: allCategories } = useQuery("allCategories", API.common.fetchAllCategories);
  const [mutate] = useMutation(API.budget.addTransaction);
  const history = useHistory();

  const handleSubmitAddTransaction = (values) => {
    mutate({
      budgetId: budget.id,
      data: values,
    }).then(() => {
      history.goBack();
    });
  };
  return (
    <AddTransactionForm
      categories={allCategories}
      groupCategoryBy="parentCategory.name"
      onSubmit={handleSubmitAddTransaction}
    />
  );
}

export default AddTransactionView;

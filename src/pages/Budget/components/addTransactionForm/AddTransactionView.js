import React from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import API from "data/fetch";
import { useHistory } from "react-router-dom";
import AddTransactionForm from "./AddTransactionForm";
import { addTransaction } from "data/actions/budget.actions";

function AddTransactionView({ addTransaction }) {
  const { data: budget } = useQuery(["budget", { id: 1 }], API.budget.fetchBudget);
  const { data: allCategories } = useQuery("allCategories", API.common.fetchAllCategories);
  const history = useHistory();

  const handleSubmitAddTransaction = (values) => {
    addTransaction({
      budgetId: budget.id,
      data: values,
    }).then(() => {
      history.goBack();
    });
  };
  return <AddTransactionForm categories={allCategories} groupCategoryBy="parentCategory.name" />;
}

export default connect(null, { addTransaction })(AddTransactionView);

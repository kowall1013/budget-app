import React, { useMemo } from "react";
import { connect } from "react-redux";
import { List, ListItem } from "./BudgetTransactionList.css";
import { groupBy } from "lodash";

import { formatCurrency, formatDate } from "utils";
import { Button } from "components";
import { useQuery } from "react-query";

import API from "data/fetch";

function BudgetTransactionList({ selectedParentCategoryId }) {
  const { data: budget } = useQuery(["budget", { id: 1 }], API.budget.fetchBudget);
  const { data: allCategories } = useQuery("allCategories", API.common.fetchAllCategories);
  const { data: budgetedCategories } = useQuery(["budgetedCategories", { id: 1 }], API.budget.fetchBudgetCategories);

  const filteredTransactionsBySelectedParentCategory = useMemo(() => {
    if (typeof selectedParentCategoryId === "undefined") {
      return budget.transactions;
    }

    if (selectedParentCategoryId === null) {
      return budget.transactions.filter((transaction) => {
        const hasBudgetedCategory = budgetedCategories.some(
          (budgetedCategory) => budgetedCategory.categoryId === transaction.categoryId
        );
        return !hasBudgetedCategory;
      });
    }

    return budget.transactions.filter((transaction) => {
      try {
        const category = allCategories.find((category) => category.id === transaction.categoryId);
        const parentCategoryName = category.parentCategory.name;
        return parentCategoryName === selectedParentCategoryId;
      } catch (error) {
        return false;
      }
    });
  }, [budget.transactions, allCategories, selectedParentCategoryId, budgetedCategories]);

  const groupedTransactions = useMemo(
    () =>
      groupBy(filteredTransactionsBySelectedParentCategory, (transaction) => new Date(transaction.date).getUTCDate()),
    [filteredTransactionsBySelectedParentCategory]
  );

  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, transactions]) => (
        <li key={key}>
          <ul>
            {transactions.map((transaction) => (
              <ListItem key={transaction.id}>
                <Button to={`/budget/transactions/${transaction.id}`}>See details</Button>
                <div>{transaction.description}</div>
                <div>{formatCurrency(transaction.amount)}</div>
                <div>{formatDate(transaction.date)}</div>
                <div>{(allCategories.find((category) => category.id === transaction.categoryId) || {}).name}</div>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}

export default connect((state) => ({
  selectedParentCategoryId: state.budget.selectedParentCategoryId,
}))(BudgetTransactionList);

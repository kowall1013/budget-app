import { ToggleableList } from "components";
import "styled-components/macro";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import React from "react";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";

import { selectParentCategory } from "data/actions/budget.actions";

function BudgetCategoryList({ budgetCategories, allCategories, budget, selectParentCategory }) {
  const budgetCategoriesByParent = groupBy(
    budgetCategories,
    (item) => allCategories.find((category) => category.id === item.categoryId).parentCategory.name
  );

  const listItem = Object.entries(budgetCategoriesByParent).map(([parentName, categories]) => ({
    id: parentName,
    Trigger: ({ onClick }) => (
      <ParentCategory
        categories={categories}
        name={parentName}
        onClick={() => {
          selectParentCategory(parentName);
          onClick(parentName);
        }}
        transactions={budget.transactions}
      />
    ),
    children: categories.map((budgetedCategory) => {
      const { name } = allCategories.find((category) => category.id === budgetedCategory.categoryId);

      return (
        <CategoryItem
          key={budgetedCategory.id}
          name={name}
          item={budgetedCategory}
          transactions={budget.transactions}
        />
      );
    }),
  }));

  const totalSpent = budget.transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const restToSpent = budget.totalAmount - totalSpent;

  const amountTaken = budgetCategories.reduce((acc, budgetedCategory) => {
    const categoryTransactions = budget.transactions.filter(
      (transaction) => transaction.categoryId === budgetedCategory.id
    );

    const categoryExpenses = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    return acc + Math.max(categoryExpenses, budgetedCategory.budget);
  }, 0);

  const notBudgetedTransaction = budget.transactions.filter((transaction) => {
    return !budgetCategories.find((budgetedCategory) => budgetedCategory.id === transaction.categoryId);
  });

  const notBudgetedExpenses = notBudgetedTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
  const availableForRestCategories = budget.totalAmount - amountTaken - notBudgetedExpenses;

  return (
    <div>
      <div
        css={`
          border-bottom: 5px solid ${({ theme }) => theme.colors.gray.light};
        `}
      >
        <ParentCategory name={budget.name} amount={restToSpent} />
      </div>

      <ToggleableList items={listItem} />
      <div
        css={`
          border-top: 5px solid ${({ theme }) => theme.colors.gray.light};
        `}
      >
        <ParentCategory name="Other Categories" amount={availableForRestCategories} />
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    budgetCategories: state.budget.budgetCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget,
  }),
  {
    selectParentCategory,
  }
)(BudgetCategoryList);

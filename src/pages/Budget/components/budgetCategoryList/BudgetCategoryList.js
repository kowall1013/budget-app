import { ToggleableList } from "components";
import "styled-components/macro";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import React, { useRef, useMemo, useCallback } from "react";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";

import { selectParentCategory } from "data/actions/budget.actions";

function BudgetCategoryList({ budgetCategories, allCategories, budget, selectParentCategory }) {
  const budgetCategoriesByParent = useMemo(
    () =>
      groupBy(
        budgetCategories,
        (item) => allCategories.find((category) => category.id === item.categoryId).parentCategory.name
      ),
    [budgetCategories, allCategories]
  );

  const handleClickParentCategoryRef = useRef(null);

  const handleClearParentCategorySelect = useCallback(() => {
    selectParentCategory();
    handleClickParentCategoryRef.current();
  }, [selectParentCategory, handleClickParentCategoryRef]);

  const handleSelectRestParentCategories = useCallback(() => {
    selectParentCategory(null);
    handleClickParentCategoryRef.current();
  }, [selectParentCategory, handleClickParentCategoryRef]);

  const listItem = useMemo(
    () =>
      Object.entries(budgetCategoriesByParent).map(([parentName, categories]) => ({
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
      })),
    [allCategories, budget.transactions, budgetCategoriesByParent, selectParentCategory]
  );

  const totalSpent = useMemo(
    () => budget.transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
    [budget.transactions]
  );
  const restToSpent = useMemo(() => budget.totalAmount - totalSpent, [budget.totalAmount, totalSpent]);

  const amountTaken = useMemo(
    () =>
      budgetCategories.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget.transactions.filter(
          (transaction) => transaction.categoryId === budgetedCategory.id
        );

        const categoryExpenses = categoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        return acc + Math.max(categoryExpenses, budgetedCategory.budget);
      }, 0),
    [budgetCategories, budget.transactions]
  );

  const notBudgetedTransaction = useMemo(
    () =>
      budget.transactions.filter((transaction) => {
        return !budgetCategories.find((budgetedCategory) => budgetedCategory.id === transaction.categoryId);
      }),
    [budget.transactions, budgetCategories]
  );

  const notBudgetedExpenses = useMemo(
    () => notBudgetedTransaction.reduce((acc, transaction) => acc + transaction.amount, 0),
    [notBudgetedTransaction]
  );
  const availableForRestCategories = useMemo(
    () => budget.totalAmount - amountTaken - notBudgetedExpenses,
    [budget.totalAmount, amountTaken, notBudgetedExpenses]
  );

  return (
    <div>
      <div
        css={`
          border-bottom: 5px solid ${({ theme }) => theme.colors.gray.light};
        `}
      >
        <ParentCategory name={budget.name} amount={restToSpent} onClick={handleClearParentCategorySelect} />
      </div>

      <ToggleableList items={listItem} clickRef={handleClickParentCategoryRef} />
      <div
        css={`
          border-top: 5px solid ${({ theme }) => theme.colors.gray.light};
        `}
      >
        <ParentCategory
          name="Other Categories"
          amount={availableForRestCategories}
          onClick={handleSelectRestParentCategories}
        />
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

import React, { useMemo } from "react";
import { ParentCategory as Root, CategoryAmount } from "./BudgetCategoryList.css";

function ParentCategory({ name, onClick, categories, transactions }) {
  const categoryLeftValue = useMemo(() => {
    const budgeted = (() => {
      try {
        return categories.reduce((acc, category) => acc + category.budget, 0);
      } catch (error) {
        return null;
      }
    })();

    const parentCategoryTransactions = transactions.filter((tranaction) =>
      categories.find((category) => category.categoryId === tranaction.categoryId)
    );

    const spentOnParentCategory = parentCategoryTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalLeft = budgeted ? budgeted - spentOnParentCategory : null;

    return totalLeft.toFixed(2);
  }, [categories, transactions]);

  return (
    <Root onClick={onClick}>
      <span>{name}</span>
      <CategoryAmount negative={categoryLeftValue < 0}>{categoryLeftValue} </CategoryAmount>
    </Root>
  );
}

export default ParentCategory;

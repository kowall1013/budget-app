import { ToggleableList } from "components";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import React from "react";

function BudgetCategoryList({ budgetCategories, allCategories }) {
  const budgetCategoriesByParent = groupBy(
    budgetCategories,
    (item) => allCategories.find((category) => category.id === item.categoryId).parentCategory.name
  );

  const listItem = Object.entries(budgetCategoriesByParent).map(([parentName]) => ({
    id: parentName,
    Trigger: ({ onClick }) => <h1>Mateusz</h1>,
    children: allCategories.map((category) => <h1>KOwalski</h1>),
  }));

  return (
    <div>
      <ToggleableList items={[]} />
    </div>
  );
}

export default connect((state) => ({
  budgetCategories: state.budget.budgetCategories,
  allCategories: state.common.allCategories,
}))(BudgetCategoryList);

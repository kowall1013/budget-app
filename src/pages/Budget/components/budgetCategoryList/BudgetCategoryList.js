import { ToggleableList } from "components";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import React from "react";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";

function BudgetCategoryList({ budgetCategories, allCategories }) {
  const budgetCategoriesByParent = groupBy(
    budgetCategories,
    (item) => allCategories.find((category) => category.id === item.categoryId).parentCategory.name
  );

  const listItem = Object.entries(budgetCategoriesByParent).map(([parentName, categories]) => ({
    id: parentName,
    Trigger: ({ onClick }) => <ParentCategory name={parentName} onClick={() => onClick(parentName)} />,
    children: categories.map((budgetedCategory) => {
      const { name } = allCategories.find((category) => category.id === budgetedCategory.categoryId);

      return <CategoryItem key={budgetedCategory.id} name={name} />;
    }),
  }));

  return (
    <div>
      <ToggleableList items={listItem} />
    </div>
  );
}

export default connect((state) => ({
  budgetCategories: state.budget.budgetCategories,
  allCategories: state.common.allCategories,
}))(BudgetCategoryList);
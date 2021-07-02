import React, { createContext, useState } from "react";

const initialValue = {};
const store = createContext(initialValue);

const { Provider } = store;

function BudgetProvider({ children }) {
  const [selectedParentCategoryId, setSelectedParentCategoryId] = useState();
  return (
    <Provider
      value={{
        selectedParentCategoryId,
        setSelectedParentCategoryId,
      }}
    >
      {children}
    </Provider>
  );
}

const BudgetContext = {
  store,
  BudgetProvider,
};

export default BudgetContext;

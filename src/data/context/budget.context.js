import React, { createContext, useState, useReducer } from "react";

const initialValue = {};
const store = createContext(initialValue);

const { Provider } = store;

function reducer(state, action) {
  switch (action.type) {
    case "selectParentCategoryId":
      return {
        ...state,
        selectedParentCategoryId: action.payload,
      };
    default:
      return state;
  }
}

//

function BudgetProvider({ children }) {
  //   const [selectedParentCategoryId, setSelectedParentCategoryId] = useState(); Tak to robiło się z useState
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <Provider
      value={{
        ...state,
        dispatch,
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

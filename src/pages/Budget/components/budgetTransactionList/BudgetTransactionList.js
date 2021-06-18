import React from "react";
import { connect } from "react-redux";
import { List, ListItem } from "./BudgetTransactionList.css";

function BudgetTransactionList({ transaction }) {
  console.log(transaction);
  return (
    <List>
      <li>
        <ul>
          <li></li>
        </ul>
      </li>
    </List>
  );
}

export default connect((state) => ({
  transaction: state.budget.budget.transactions,
}))(BudgetTransactionList);

import React from "react";
import { useLocation } from "react-router-dom";

function TransactionDetails({ transactions }) {
  const location = useLocation();

  const id = location.pathname.slice(21).trim();
  const filtered = transactions?.filter((item) => item.id === id);

  return (
    <ul>
      {filtered?.map((item) => {
        return (
          <div key={item.id}>
            <li>Amount:{item.amount}</li>
            <li>Date:{item.date}</li>
            <li>Description:{item.description}</li>
          </div>
        );
      })}
    </ul>
  );
}

export default TransactionDetails;

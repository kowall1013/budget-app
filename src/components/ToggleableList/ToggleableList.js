import React, { useState } from "react";

const Item = ({ item, onClickHandler, isActive }) => {
  console.log("isActive", onClickHandler);
  return (
    <div>
      <item.Trigger onClick={onClickHandler} />
      {isActive && item.children}
    </div>
  );
};

function ToggleableList({ items }) {
  const [selectedItem, setSelectedItem] = useState();
  return (
    <>
      {items.map((item) => (
        <Item key={item.id} item={item} onClickHandler={setSelectedItem} isActive={selectedItem === item.id} />
      ))}
    </>
  );
}

export default ToggleableList;
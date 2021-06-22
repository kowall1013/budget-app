import React, { useState, useEffect } from "react";

const Item = ({ item, onClickHandler, isActive }) => {
  return (
    <div>
      <item.Trigger onClick={onClickHandler} />
      {isActive && item.children}
    </div>
  );
};

function ToggleableList({ items, clickRef }) {
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    clickRef.current = setSelectedItem;
  }, [clickRef, setSelectedItem]);

  return (
    <>
      {items.map((item) => (
        <Item key={item.id} item={item} onClickHandler={setSelectedItem} isActive={selectedItem === item.id} />
      ))}
    </>
  );
}

export default ToggleableList;

import React from "react";
import { useDrop } from "react-dnd";
// DropZone Component for handling the drop action
const ItemType = "ITEM";
const DropZone = ({ children, moveItem }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (draggedItem) => moveItem(draggedItem.index),
  }));

  return (
    <div
      ref={drop}
      style={{
        minHeight: "300px",
        padding: "20px",
        border: "1px dashed #ccc",
      }}
    >
      {children}
    </div>
  );
};
export default DropZone;

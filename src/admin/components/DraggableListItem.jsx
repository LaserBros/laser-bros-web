import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useDrag, useDrop } from "react-dnd";

// Define the type for the draggable item
const ItemType = "ITEM";

// The main component that renders the list of items
const DragDropList = ({ id, dragoption }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (dragoption.length > 0) {
      setItems(dragoption);
    }

    // }
  }, [dragoption]);

  // Function to move items in the list
  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    console.log("updatedItems", updatedItems);

    let existingData = localStorage.getItem("setItempartsDBdataAdmin");
    let parsedData = existingData ? JSON.parse(existingData) : [];

    let existingQuote = parsedData.find((item) => item._id === id);

    if (existingQuote && existingQuote.post_ops) {
      existingQuote.post_ops = updatedItems;
    }

    localStorage.setItem("setItempartsDBdataAdmin", JSON.stringify(parsedData));

    setItems(updatedItems);
  };

  // Function to remove an item
  const removeItem = (selected, idSelect) => {
    let existingData = localStorage.getItem("setItempartsDBdataAdmin");
    let parsedData = existingData ? JSON.parse(existingData) : [];

    let existingQuote = parsedData.find((item) => item._id === idSelect);
    console.log(":", existingQuote.post_ops, selected);
    if (existingQuote && existingQuote.post_ops) {
      existingQuote.post_ops = existingQuote.post_ops.filter(
        (item) => item !== selected
      );
    }

    localStorage.setItem("setItempartsDBdataAdmin", JSON.stringify(parsedData));
    setItems((prevItems) => prevItems.filter((item) => item !== selected));
  };

  return (
    <div>
      {items.map((item, index) => (
        <DraggableItem
          key={item.id || index} // Ensure a unique key for each item
          index={index}
          item={item}
          id={id}
          moveItem={moveItem}
          removeItem={() => removeItem(item, id)} // Replace with the correct quote ID
        />
      ))}
    </div>
  );
};

// The component representing each draggable item
const DraggableItem = ({ index, item, id, moveItem, removeItem }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index; // Update the dragged item's index
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "move",
      }}
    >
      <span>{item.name || item}</span>
      <Button
        style={{
          cursor: "pointer",
          color: "#ff0000",
        }}
        onClick={() => removeItem(item, id)}
      >
        x
      </Button>
    </div>
  );
};

export default DragDropList;

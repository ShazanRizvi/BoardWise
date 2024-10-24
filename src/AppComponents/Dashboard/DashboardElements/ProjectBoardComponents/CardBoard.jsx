import React, { useContext } from "react";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import AppContext from "../../../../context/AppContext";
import BoardColumn from "./BoardColumn";


const CardBoard = () => {
  const { columns, setColumns } = useContext(AppContext);
  console.log(columns);

  const addColumn = () => {
    setColumns([
      ...columns,
      { id: `column-${Date.now()}`, title: "New Column", cards: [] },
    ]);
  };

  const deleteColumn = (columnId) => {
    setColumns(columns.filter((column) => column.id !== columnId));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    // Find the column and card where the drag started
    const sourceColumnIndex = columns.findIndex((col) =>
      col.cards.some((card) => card.id === active.id)
    );
    const sourceColumn = columns[sourceColumnIndex];
    const card = sourceColumn.cards.find((card) => card.id === active.id);

    // Find the destination column
    const destinationColumnIndex = columns.findIndex(
      (col) => col.id === over.id
    );
    const destinationColumn = columns[destinationColumnIndex];

    if (sourceColumn === destinationColumn) {
      // Reorder within the same column (if needed)
      return;
    }

    // Move card to the new column
    const newSourceCards = sourceColumn.cards.filter(
      (card) => card.id !== active.id
    );
    const newDestinationCards = [...destinationColumn.cards, card];

    const updatedColumns = columns.map((col, index) => {
      if (index === sourceColumnIndex) {
        return { ...col, cards: newSourceCards };
      }
      if (index === destinationColumnIndex) {
        return { ...col, cards: newDestinationCards };
      }
      return col;
    });

    setColumns(updatedColumns);
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-full flex mt-5 p-2 h-full bg-gray-200">
        {columns.map((column) => (
          <BoardColumn key={column.id} column={column} cards={column?.cards} />
        ))}
      </div>
    </DndContext>
  );
};

export default CardBoard;

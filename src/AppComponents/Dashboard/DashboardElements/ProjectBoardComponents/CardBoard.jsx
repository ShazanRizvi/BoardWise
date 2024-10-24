import React, { useContext } from "react";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import AppContext from "../../../../context/AppContext";
import BoardColumn from "./BoardColumn";

const CardBoard = () => {
  const { columns, setColumns, cards, setCards } = useContext(AppContext);
  console.log(columns);

  const addColumn = () => {
    setColumns([
      ...columns,
      { id: `column-${Date.now()}`, title: "New Column", cardIds: [] },
    ]);
  };

  const deleteColumn = (columnId) => {
    setColumns(columns.filter((column) => column.id !== columnId));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    // Find the source column and card where the drag started
    const sourceColumnIndex = columns.findIndex((col) =>
      col.cardIds.includes(active.id)
    );
    const sourceColumn = columns[sourceColumnIndex];

    // Find the destination column
    const destinationColumnIndex = columns.findIndex(
      (col) => col.id === over.id
    );
    const destinationColumn = columns[destinationColumnIndex];

    if (sourceColumn === destinationColumn) {
      // If the card is dragged within the same column, reordering logic can go here
      return;
    }

    // Move card to the new column
    const newSourceCardIds = sourceColumn.cardIds.filter(
      (cardId) => cardId !== active.id
    );
    const newDestinationCardIds = [...destinationColumn.cardIds, active.id];

    const updatedColumns = columns.map((col, index) => {
      if (index === sourceColumnIndex) {
        return { ...col, cardIds: newSourceCardIds };
      }
      if (index === destinationColumnIndex) {
        return { ...col, cardIds: newDestinationCardIds };
      }
      return col;
    });

    setColumns(updatedColumns);
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-full flex mt-5 p-2 h-full bg-gray-100 rounded-xl shadow-2xl shadow-gray-500/50">
        {columns.map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            cards={column.cardIds.map((cardId) => cards[cardId])}
          />
        ))}
      </div>
    </DndContext>
  );
};

export default CardBoard;

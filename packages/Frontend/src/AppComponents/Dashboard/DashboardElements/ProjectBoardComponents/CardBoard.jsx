import React, { useContext, useState } from "react";
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import AppContext from "../../../../context/AppContext";
import BoardColumn from "./BoardColumn";
import BoardCardOverlay from "./BoardCardOverlay";
const CardBoard = () => {
  const { columns, setColumns, cards, setCards } = useContext(AppContext);
  const [activeId, setActiveId] = useState(null);

  const addColumn = () => {
    setColumns([
      ...columns,
      { id: `column-${Date.now()}`, title: "New Column", cardIds: [] },
    ]);
  };

  const deleteColumn = (columnId) => {
    setColumns(columns.filter((column) => column.id !== columnId));
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id); // Set active card's ID when dragging starts
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

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
  
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="w-full flex mt-5 p-2 h-full bg-gray-100 rounded-xl shadow-2xl shadow-gray-500/50">

        {columns.length === 0 ? (
      <div className="flex-grow flex items-center justify-center h-full">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={()=>alert('task added')}
        >
          Add Task
        </button>
      </div>
    ) : (
      columns.map((column) => (
        <BoardColumn
          key={column.id}
          column={column}
          cards={column.cardIds.map((cardId) => cards[cardId])}
        />
      ))
    )}
        <DragOverlay>
          {activeId ? <BoardCardOverlay card={cards[activeId]} /> : null}
        </DragOverlay>
      </div>
    </DndContext>
    
  );
};

export default CardBoard;

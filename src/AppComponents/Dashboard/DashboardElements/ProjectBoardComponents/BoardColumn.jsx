import React from "react";
import { Button } from "@/components/ui/Button";

import { useDroppable } from "@dnd-kit/core";
import BoardCard from "./BoardCard";

import { HiDotsVertical } from "react-icons/hi";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { GoPlus } from "react-icons/go";

const BoardColumn = ({ column, cards }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });
  return (
    <div className="w-full h-full " ref={setNodeRef}>
      <div className="p-2">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-semibold">{column.title}</h2>
          <HiDotsVertical />
        </div>
      </div>
      <div className="mr-2 ml-2">
        <Button
          className="w-full p-5 rounded-md shadow-md bg-white text-black hover:bg-primary-200"
          size="sm"
        >
          <GoPlus size={30} />
        </Button>
      </div>

      <div className="column-body mr-2 ml-2">
        {cards.map((card) => (
          <BoardCard className="z-80" key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;

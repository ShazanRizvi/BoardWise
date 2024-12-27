import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

import { useDroppable } from "@dnd-kit/core";
import BoardCard from "./BoardCard";

import { HiDotsVertical } from "react-icons/hi";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { GoPlus } from "react-icons/go";
import AddEditTaskDialog from "./AddEditTaskDialog";
import AddTaskForm from "./ModalForms/AddTaskForm";
import { FcGenealogy } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const BoardColumn = ({ column, cards }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleDialogOpen = () => {
    setIsDialogOpen((prev) => !prev);
  };
  return (
    <div className=" h-full w-full overflow-auto" ref={setNodeRef}>
      <div className="p-2 sticky top-0 bottom-5 bg-gray-100 z-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <h2 className="text-base font-semibold">{column.title}</h2>
            <div className=" text-gray-500">{cards.length} </div>
          </div>
          <Popover>
            <PopoverTrigger>
              <HiDotsVertical />
            </PopoverTrigger>
            <PopoverContent>
              <Button className="p-1" variant="ghost">
                Delete Column
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="mr-2 ml-2 sticky  top-14 z-10 ">
        <Button
          className="w-full p-5 rounded-lg  bg-white text-black hover:bg-primary-200"
          size="sm"
          onClick={handleDialogOpen}
        >
          <GoPlus size={30} />
        </Button>
        <AddEditTaskDialog
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          Title={`${column.title} Task`}
          icon={<FcGenealogy size={24} />}
        >
          <AddTaskForm />
        </AddEditTaskDialog>
      </div>

      <div className="overflow-y-auto  mr-2 ml-2 pb-5  ">
        {cards.map((card) => (
          <BoardCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;

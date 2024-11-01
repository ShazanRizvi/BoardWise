import React, { useState, useContext } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Badge } from "@/components/ui/badge";
import { HiDotsVertical } from "react-icons/hi";
import { Separator } from "@/components/ui/Separator";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { BiMessageSquare } from "react-icons/bi";
import AppContext from "../../../../context/AppContext";
import SideDrawer from "./SideDrawer";
import TaskChat from "./ChatInterfaces/TaskChat";
import UserChat from "./ChatInterfaces/UserChat";

const BoardCard = ({ card }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: card.id, // Unique ID for each card
  });
  const { isDrawerOpen, chatType, openDrawerWithChat, closeDrawer, selectedCard } = useContext(AppContext);
  

  const handleTaskChat = () => openDrawerWithChat("task", card);
  const handleUserChat = () => openDrawerWithChat("user", card);

  return (
    <div
      className={`p-5 rounded-xl bg-white shadow-md mt-5 z-50`}
      ref={setNodeRef}
      {...attributes}
    >
      <div
        className={`${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        {...listeners}
        {...attributes}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {card.badges.map((badge, index) => (
              <Badge
                key={index}
                className={`badge px-3 py-1 text-xs rounded-full text-white`}
                style={{ backgroundColor: badge.color }}
              >
                {badge.label}
              </Badge>
            ))}
          </div>
          <div>
            <HiDotsVertical />
          </div>
        </div>
        <h2 className="text-base font-semibold mt-4">{card.title}</h2>
        <p className="text-sm text-gray-500">{card.description}</p>
      </div>
      <Separator className="mt-5 bg-gray-100" />
      <div className="flex justify-between items-center w-full mt-2">
        <div className="flex">
          <button className="flex " onClick={handleUserChat}>
            <AnimatedTooltip items={card?.people} />
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleTaskChat}
            className=" flex items-center"
          >
            <BiMessageSquare size={24} color="#cbd5e1" />
            <p className="text-sm text-slate-400">4</p>
          </button>
        </div>
      </div>
      <SideDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer}>
      {chatType === "task" && <TaskChat card={selectedCard} />}
      {chatType === "user" && <UserChat />}
      </SideDrawer>
    </div>
  );
};

export default BoardCard;

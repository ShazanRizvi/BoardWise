import React from "react";
import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";
import { Badge } from "@/components/ui/badge";
import { HiDotsVertical } from "react-icons/hi";
import { Separator } from "@/components/ui/Separator";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { BiMessageSquare } from "react-icons/bi";

const BoardCard = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id, // Unique ID for each card
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };
  return (
    <motion.div
      className="p-5 rounded-xl bg-white shadow-md mt-5"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="flex justify-between items-center ">
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
      <Separator className="mt-5 bg-gray-100" />
      <div className="flex justify-between items-center w-full mt-2">
        <div className="flex">
          <AnimatedTooltip items={card?.people} />
        </div>
        <div className="flex items-center gap-1">
          <BiMessageSquare size={24} color="#cbd5e1" />
          <p className="text-sm text-slate-400">4</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BoardCard;

import React from 'react'

import { useDroppable } from '@dnd-kit/core';
import BoardCard from './BoardCard';

const BoardColumn = ({column, cards}) => {
     const { setNodeRef } = useDroppable({
          id: column.id,
        });
  return (
     <div className=" w-full h-full" ref={setNodeRef}>
      <div className=" p-2 ">
        <h2>{column.title}</h2>
      </div>
      <div className="column-body bg-gray-400   mr-2 ml-2">
        {cards.map((card) => (
          <BoardCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}

export default BoardColumn

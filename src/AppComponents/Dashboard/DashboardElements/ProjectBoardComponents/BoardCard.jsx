import React from 'react'
import { motion } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';

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
     className="card"
     ref={setNodeRef}
     style={style}
     {...listeners}
     {...attributes} 
   >
     <p>{card.title}</p>
   </motion.div>
 );
  
}

export default BoardCard

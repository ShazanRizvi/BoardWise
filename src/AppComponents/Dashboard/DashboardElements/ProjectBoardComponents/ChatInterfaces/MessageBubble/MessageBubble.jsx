import React from 'react'

const MessageBubble = ({ message, isSender }) => {
  return (
     <div
     className={` flex  ${isSender ? "justify-end" : "justify-start"} mb-2`}
   >
     <div
       className={`p-3 text-sm rounded-xl max-w-xs ${
         isSender ? "bg-primary-500 text-white" : "bg-gray-200 text-black"
       }`}
     >
       {!isSender && <p className="text-sm font-semibold">{message.sender}</p>}
       <p className="text-sm">{message.content}</p>
       <span className="text-xs text-gray-100 mt-1 block">
         8:30 AM
       </span>
     </div>
   </div>
  )
}

export default MessageBubble

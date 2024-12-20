import React, { useContext, useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RxCross2 } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import AppContext from "../../../../../context/AppContext";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Input } from "@/components/ui/input";
import { FiSend } from "react-icons/fi";
import { HiOutlinePaperClip } from "react-icons/hi2";
import MessageBubble from "./MessageBubble/MessageBubble";
import "./CSS/TaskChat.css";
import Loader from "../../../../../utils/Loader";

const TaskChat = ({ card }) => {
  const { closeDrawer,isDrawerOpen } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  
  const ChatUILoading=()=>{
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  useEffect(() => { 
    ChatUILoading();

  }, [isDrawerOpen]);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { content: input, sender: "You" }]);
      setInput("");
    }
  };

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    const isNearBottom =
      messageContainer.scrollHeight - messageContainer.scrollTop <=
      messageContainer.clientHeight + 100; // Adjust threshold as needed

    if (isNearBottom) {
      messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return  loading?(<div className=" flex justify-center items-center h-screen w-full">
      <Loader width={100} height={100} />
    </div>):(<div className="flex flex-col h-screen">
      <div className="flex justify-between">
        <Button
          onClick={closeDrawer}
          className="bg-gray-100 w-8 h-8 rounded-full hover:bg-gray-300"
        >
          <RxCross2 color="grey" />
        </Button>
        <div>
          <HiDotsVertical />
        </div>
      </div>
      <div className="flex m-6  justify-between items-center">
        <div className="  rounded-full ">
          <h2 className="text-lg text-black font-semibold">{card.title}</h2>
          <p className="text-sm text-gray-400 font-normal">
            {card.description}
          </p>
        </div>
        <div className="flex mr-5">
          <AnimatedTooltip items={card?.people} />
        </div>
      </div>
      <div
        ref={messageContainerRef}
        className="flex flex-grow mb-28 flex-col overflow-y-auto no-scrollbar p-4 rounded-lg "
      >
        {messages.length === 0 ? (
          <div className="flex ">
            <div className="bg-gradient-to-tr from-primary-100 to-secondary-100 p-4 rounded-xl shadow-xl">
              <div className="flex justify-center">
                <h1 className="text-lg text-black font-semibold ">
                  No messages yet for this task
                </h1>
              </div>
              <div>
                <p className="text-sm mt-4 text-gray-500">This is a Task group to interact with people in the task. Chat, Brainstorm and interact with your teammates here!</p>
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <MessageBubble
              key={index}
              message={msg}
              isSender={msg.sender === "You"}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input */}
      <div className=" fixed bottom-0  w-1/3 right-0  p-4">
        <div className="flex items-center  border border-gray-400  rounded-full overflow-hidden">
          <div className="w-10 h-10 ml-4 flex justify-center items-center ">
            <HiOutlinePaperClip size={24} color="grey" />
          </div>
          <Input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-2 focus:outline-none border-none bg-transparent focus-visible:ring-0"
          />
          <Button
            onClick={handleSendMessage}
            className="px-4 w-10 h-10 m-2 rounded-full"
          >
            <FiSend />
          </Button>
        </div>
      </div>
    </div>)
    
  
};

export default TaskChat;

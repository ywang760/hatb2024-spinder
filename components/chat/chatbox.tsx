import { useState } from "react";
import { Message } from "@/types/chat";
import Button from "@mui/material/Button";

export default function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [myInput, setMyInput] = useState("");

  const getResponse = async (myInput: string) => {
    // call the chat api and fetch a response
    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ myInput }),
    });

    const data = await response.json();
    const responseMesage: Message = { content: data.content, sender: "Bot" }; //TODO: change name
    setMessages([...messages, responseMesage]);
  };

  const handleSend = async (myInput: string) => {
    setMyInput("");
    setMessages([...messages, { content: myInput, sender: "You" }]);
    await getResponse(myInput);
  };

  return (
    <div className="flex flex-col h-screen border bg-zinc-300">
      <div className="overflow-auto p-4 flex-grow">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-2 rounded w-max ${
              message.sender === "You"
                ? "bg-blue-200 ml-auto"
                : "bg-green-200 mr-auto"
            }`}
          >
            <p className="font-bold">{message.sender}</p>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      <div className="p-4 flex-none">
        <div className="flex">
          {/* TODO: move button somewhere else */}
          <Button onClick={() => setMessages([])}>Clear</Button>
          <input
            className="flex-grow rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Write your message..."
            value={myInput}
            onChange={(e) => setMyInput(e.target.value)}
          />
          <button
            className="px-8 rounded-r-lg bg-blue-400 text-white font-bold p-2 uppercase border-blue-500 border-t border-b border-r"
            onClick={() => handleSend(myInput)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

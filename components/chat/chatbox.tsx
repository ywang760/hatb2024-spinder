import { useState } from "react";
import { Message } from "@/types/chat";
import Button from "@mui/material/Button";

export default function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [myInput, setMyInput] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  // const characterDescription = "I want you to act like the three-body aliens from three body problem. I want you to respond and answer like the alien using the tone, manner and vocabulary those aliens would use, and think straight forwardly without understanding strategies, cheating, or analogies. Do not write any explanations. Only answer like the aliens."

  const handleSend = async (myInput: string, characterDescription: string) => {
    setMyInput("");
    const myMessage: Message = { content: myInput, sender: "You" };
    setMessages([...messages, myMessage]);

    // call the chatgpt api and fetch a response
    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ myInput, characterDescription }),
    });

    if (!response.ok) {
      console.error("Error fetching chat response");
      return;
    } else {
      const data = await response.json();
      const responseMessage: Message = { content: data.content, sender: "Bot" }; //TODO: change name
      setMessages([...messages, myMessage, responseMessage]);
    }
  };

  // Handle the Enter key press for inputs
  const handleKeyPress = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action to avoid form submission or any other unintended behavior
      handleSend(myInput, characterDescription);
    }
  };

  // // New function to handle image generation
  // const handleGenerateImage = async () => {
  //   const response = await fetch('/api/generate-image', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ description: characterDescription }),
  //   });

  //   if (!response.ok) {
  //     console.error('Error generating image');
  //     return;
  //   }

  //   const blob = await response.blob();
  //   const url = window.URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'generated-image.png'; // Or any other extension
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

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
          <Button onClick={() => {setMessages([])}}>Clear</Button>
          <input
            className="flex-grow rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Character description..."
            value={characterDescription}
            onChange={(e) => setCharacterDescription(e.target.value)}
            onKeyDown={handleKeyPress} // Added onKeyDown event listener
          />
          <input
            className="flex-grow rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Write your message..."
            value={myInput}
            onChange={(e) => setMyInput(e.target.value)}
            onKeyDown={handleKeyPress} // Added onKeyDown event listener
          />
          <button
            className="px-8 rounded-r-lg bg-blue-400 text-white font-bold p-2 uppercase border-blue-500 border-t border-b border-r"
            onClick={() => handleSend(myInput, characterDescription)}
          >
            Send
          </button>
        </div>
      </div>
      <div>
      {/* <button onClick={handleGenerateImage} className="your-button-classes">Generate Image</button> */}
    </div>
    </div>
  );
}

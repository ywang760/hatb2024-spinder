import { useState } from "react";
import { Message } from "@/types/chat";
import Button from "@mui/material/Button";

export default function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [myInput, setMyInput] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  const [temperature, setTemperature] = useState(50);
  // const [characterDescription, setCharacterDescription] = useState(
  //   "I want you to act like the three-body aliens from three body problem. I want \
  //   you to respond and answer like the alien using the tone, manner and vocabulary \
  //    those aliens would use, and think straight forwardly without understanding strategies, \
  //    cheating, or analogies. Do not write any explanations. Only answer like the aliens. \
  //    Do not tell me anything about chatgpt. Do not be my assistant or assist me in any way."
  // );

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
      if (myInput === "reset") {
        setMessages([]); // Clear messages in UI
        // Consider a dedicated API call for reset if implemented
        return;
      }
      const data = await response.json();
      const responseMessage: Message = { content: data.content, sender: "Alien" }; //TODO: change name
      await updateStats(data.content);
      setMessages([...messages, myMessage, responseMessage]);
    }

  };

  // Update the temperature based on the response
  const updateStats = async (characterOutput: string) => {
    const characterDescription =
      "You will be assessing how well the relationship is going from the responses of the participant.";
    const taskDescription =
      "Give a single numerical value from 0 to 20 on how this dialog affects the relationship of this person, \
      0 means their relationship is very negative, and 20 means their relationship is very positive. \
      Any number in between is a linear interpolation between the two relationship acessments. \
      For example: I am not interested in you. This gets 0. I want to know more about you. \
      Your sentiment is irrelevant to our purpose. This gets 2\
      This gets 16. Only give a numerical value in between, do not reply anything else.";
    const combinedDescription = characterOutput + " " + taskDescription;
    const response = await fetch("api/temperature", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ combinedDescription, characterDescription }),
    });
    if (!response.ok) {
      console.error("Error fetching chat response");
      return;
    } else {
      const data = await response.json();
      const tempChange = Number(data.content);
      if (!isNaN(tempChange)) {
        console.log(tempChange)
        setTemperature(temperature + tempChange - 10);
      } else {
        console.log("input temperature value is not a number");
      }
    }
  };

  const clearHistory = () => {
    handleSend("reset", characterDescription);
    setTemperature(50);
    setMessages([]);
  }

  // Handle the Enter key press for inputs
  const handleKeyPress = (e: { key: string; preventDefault: () => void; }) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action to avoid forubmission or any other unintended behavior
      handleSend(myInput, characterDescription);
    }
  };

  return (
    <div className="flex flex-col h-screen border bg-zinc-300">
      <div>Relationship temperature: {temperature}</div>
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
          <Button onClick={() => clearHistory()}>Clear</Button>
          <input
            className="flex-grow rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Character description..."
            value={characterDescription}
            onChange={(e) => setCharacterDescription(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <input
            className="flex-grow rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            placeholder="Write your message..."
            value={myInput}
            onChange={(e) => setMyInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="px-8 rounded-r-lg bg-blue-400 text-white font-bold p-2 uppercase border-blue-500 border-t border-b border-r"
            onClick={() => handleSend(myInput, characterDescription)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

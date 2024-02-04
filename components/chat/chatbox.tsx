import { Message } from "@/types/chat";
import { useContext, useState } from "react";
import { AlienStateContext } from "../../components/AlienContext";
import { Alien } from "@/types/alien";
import data from "../../data/alien.json";

export default function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [myInput, setMyInput] = useState("");
  // const [characterDescription, setCharacterDescription] = useState(
  //   "I want you to act like the three-body aliens from three body problem. I want you to respond and answer like the alien using the tone, manner and vocabulary those aliens would use, and think straight forwardly without understanding strategies, cheating, or analogies. Do not write any explanations. Only answer like the aliens."
  // );
  const [temperature, setTemperature] = useState(50);
  const [imageURL, setImageURL] = useState(
    "https://media.gq-magazine.co.uk/photos/63bee87a57e25ad39c962d73/16:9/w_1280,c_limit/The-three-body-problem-hp.jpg"
  );
  const [imageCounter, setImageCounter] = useState(0);
  // const [characterDescription, setCharacterDescription] = useState(
  //   "I want you to act like the three-body aliens from three body problem. I want \
  //   you to respond and answer like the alien using the tone, manner and vocabulary \
  //    those aliens would use, and think straight forwardly without understanding strategies, \
  //    cheating, or analogies. Do not write any explanations. Only answer like the aliens. \
  //    Do not tell me anything about chatgpt. Do not be my assistant or assist me in any way."
  // );
  const context = useContext(AlienStateContext);
  if (!context) {
    throw new Error("useAlienState must be used within a AlienStateProvider");
  }
  const { chosenAlien, setChosenAlien } = context;
  if (chosenAlien === null) {
    return <div>Choose an alien first</div>;
  }
  const aliens: Alien[] = data;
  const alien = aliens[chosenAlien];
  const alien_json = JSON.stringify(alien);

  const characterDescription = "You are an alien. Here is a description of yourself: \n" + alien_json + "\n You must respond to all prompts in character, using the tone, manner and vocabulary that is representative of your character. Think straight forward without understanding strategies, cheating, or analogies. Do not write any explanations.";

  console.log(characterDescription);

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
      const responseMessage: Message = {
        content: data.content,
        sender: "Alien",
      }; //TODO: change name
      await updateStats(data.content);
      setMessages([...messages, myMessage, responseMessage]);
      console.log(messages);
      setImageCounter(imageCounter + 1);
      if (imageCounter == 4) {
        getImage();
        setImageCounter(0);
      }
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
        console.log(tempChange);
        setTemperature(temperature + tempChange - 10);
      } else {
        console.log("input temperature value is not a number");
      }
    }
  };

  // Get the prompt to use for generating the image
  const getImagePrompt = async (): Promise<string> => {
    const messagesConcatenated = messages
      .map((obj) =>
        Object.entries(obj)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ")
      )
      .join("; ");
    console.log(messagesConcatenated);
    const characterDescription =
      "You will be assessing a conversation history and determining what is the best prompt to generate an image representative of it.";
    const taskDescription =
      "Assess the following conversation history and generate a prompt for an image that is representative of it. Be short and concise.";
    const combinedDescription = taskDescription + "\n" + messagesConcatenated;

    console.log(messagesConcatenated);
    const response = await fetch("api/image_prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ combinedDescription, characterDescription }),
    });
    if (!response.ok) {
      console.error("Error fetching chat response");
      return "";
    } else {
      const data = await response.json();
      return data.content;
    }
  };

  // Get an image based on conversation
  const getImage = async () => {
    const imagePrompt = await getImagePrompt();
    if (imagePrompt) {
      const response = await fetch("api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePrompt }),
      });
      if (!response.ok) {
        console.error("Error fetching chat response");
        return;
      } else {
        const data = await response.json();
        setImageURL(data.content);
      }
    }
  };

  const clearHistory = () => {
    handleSend("reset", characterDescription);
    setTemperature(50);
    setMessages([]);
  };

  // Handle the Enter key press for inputs
  const handleKeyPress = (e: { key: string; preventDefault: () => void }) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action to avoid forubmission or any other unintended behavior
      handleSend(myInput, characterDescription);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <img
        className="fixed inset-0 w-full h-full object-cover"
        src={imageURL}
        alt="image description"
        style={{ zIndex: -1 }}
      />
      <div className="flex flex-col relative z-10 p-6 flex-grow overflow-auto">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between font-mono pb-4">
            <div>
              <span className="text-xl font-semibold inline-block py-1 px-2 uppercase rounded text-blue-200 bg-black">
                {aliens[chosenAlien].name} Relationship Temp
              </span>
            </div>
            <div className="text-right">
              <span
                className="font-semibold inline-block text-blue-200 bg-black text-xl py-1 px-2"
                style={{ borderRadius: "0.5rem" }}
              >
                {temperature}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-3 text-xs flex rounded bg-black">
            <div
              style={{ width: `${temperature}%` }}
              className="progress-bar"
            ></div>
          </div>
        </div>

        <div
          className="overflow-auto p-4 flex-grow"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-2 rounded w-max ${
                message.sender === "You"
                  ? "bg-blue-200 ml-auto"
                  : "bg-green-200 mr-auto"
              }`}
              style={{
                wordWrap: "break-word",
                maxWidth: "80%",
                padding: "10px",
              }}
            >
              <p className="font-bold font-nanum text-2xl">{message.sender}</p>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className="fixed inset-x-0 bottom-0 p-4 z-20"
        style={{ background: "rgba(0, 0, 0, 0.6)" }}
      >
        <div className="mx-auto" style={{ maxWidth: "calc(100% - 2rem)" }}>
          {" "}
          {/* Adjust the maxWidth to match the temperature bar above */}
          <div
            className="flex items-center justify-between rounded-lg overflow-hidden shadow-lg"
            style={{
              fontFamily: "sans-serif",
              background: "rgba(255, 255, 255, 0.8)",
              color: "#000",
            }}
          >
            <button
              onClick={() => clearHistory()}
              className="px-4 py-2 text-sm bg-purple-600 text-white font-bold uppercase hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
              style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)" }}
            >
              Clear
            </button>
            <input
              className="flex-grow mx-2 p-2 text-sm text-gray-800 placeholder-gray-500 bg-white bg-opacity-50 border-none rounded"
              placeholder="Character description..."
              value={characterDescription}
              onChange={(e) => setCharacterDescription(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <input
              className="flex-grow mx-2 p-2 text-sm text-gray-800 placeholder-gray-500 bg-white bg-opacity-50 border-none rounded"
              placeholder="Write your message..."
              value={myInput}
              onChange={(e) => setMyInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="px-4 py-2 text-sm bg-blue-500 text-white font-bold uppercase hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => handleSend(myInput, characterDescription)}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Alien } from "@/types/alien";
import { Message } from "@/types/chat";
import Image from "next/image";
import { useContext, useEffect, useState, useRef } from "react";

import ModalComponent from "../ModalComponent";

interface ChatboxProps {
  alien: Alien;
}

export default function Chatbox(props: ChatboxProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [myInput, setMyInput] = useState("");
  const [temperature, setTemperature] = useState(50);
  const [imageURL, setImageURL] = useState("/three-body.png");
  const [imageCounter, setImageCounter] = useState(0); // used to trigger image generation when reach 4
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

  useEffect(() => {
    if (temperature >= 100) {
      if (showModal) {
        setIsModalOpen(true);
      }
    }
  }, [temperature]);

  const closeModal = () => {
    setIsModalOpen(false);
    setShowModal(false);
    // Reset temperature or handle as necessary
  };

  const alien_json = JSON.stringify(props.alien);
  const characterDescription =
    "You are an alien looking for love. You try your best to talk to the user as if you are dating.\
     Here is a description of yourself: \n" +
    alien_json +
    "\n You must respond to all prompts in character, using the tone, manner and\
     vocabulary that is representative of who you are. You are having a conversation\
      with the user on a dating app. Your goal is to flirt with the user and figure out\
       if you would like to go on a date with the user. You are not allowed to break character.\
        You are not allowed to ask questions about the user. You are not allowed to ask questions\
         about the dating app. You are not allowed to ask questions about the conversation.\
         You are not allowed to talk anything about chatgpt or assist the user in anyway.\
         You should never start the conversation with Ah. Never. You should never reply\
         for more than 50 words.";

  useEffect(() => {
    // reset everything when the alien changes
    const resetChatHistory = async () => {
      const response = await fetch("api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          myInput: "reset",
          characterDescription: characterDescription,
        }),
      });
    };

    resetChatHistory();
    setTemperature(50);
    setMessages([]);
  }, [characterDescription, props.alien]);

  // TODO: bugfix
  // chatbox scroll to bottom utility
  const divRef = useRef(null);
  useEffect(() => {
    const div = divRef.current;
    // if (div) {
    //   div.scrollTop = div.scrollHeight;
    // }
  }, []);

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
      const responseMessage: Message = {
        content: data.content,
        sender: props.alien.name,
      };
      setMessages([...messages, myMessage, responseMessage]);

      await updateStats(data.content);

      setImageCounter(imageCounter + 1);
      if (imageCounter == 5) {
        // getImage(); TODO: fix image
        setImageCounter(0);
      }
    }
  };

  // Update the temperature based on the response
  const updateStats = async (characterOutput: string) => {
    const characterDescription =
      "You will be assessing how well the relationship is going from the responses of the participant.";
    const taskDescription =
      "Give a single numerical value from 0 to 10 on how this dialog affects the relationship of this person, \
      0 means their relationship is very negative, and 20 means their relationship is very positive. \
      Any number in between is a linear interpolation between the two relationship acessments. \
      For example: I am not interested in you. This gets 0. \
      Your sentiment is irrelevant to our purpose. This gets 2. I want to know more about you. \
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
        setTemperature(temperature + tempChange - 5);
      } else {
        console.log("input temperature value is not a number");
      }
    }
  };

  // // Get the prompt to use for generating the image
  // const getImagePrompt = async (): Promise<string> => {
  //   const messagesConcatenated = messages
  //     .map((obj) =>
  //       Object.entries(obj)
  //         .map(([key, value]) => `${key}: ${value}`)
  //         .join(", ")
  //     )
  //     .join("; ");
  //   const characterDescription =
  //     "You will be assessing a conversation history and determining what is the best prompt to generate an image representative of it.";
  //   const taskDescription =
  //     "Assess the following conversation history and generate a prompt for an image that is representative of it. Be short and concise.";
  //   const combinedDescription = taskDescription + "\n" + messagesConcatenated;

  //   const response = await fetch("api/image_prompt", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ combinedDescription, characterDescription }),
  //   });
  //   if (!response.ok) {
  //     console.error("Error fetching chat response");
  //     return "";
  //   } else {
  //     const data = await response.json();
  //     return data.content;
  //   }
  // };

  // // Get an image based on conversation
  // const getImage = async () => {
  //   const imagePrompt = await getImagePrompt();
  //   if (imagePrompt) {
  //     const response = await fetch("api/image", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ imagePrompt }),
  //     });
  //     if (!response.ok) {
  //       console.error("Error fetching chat response");
  //       return;
  //     } else {
  //       const data = await response.json();
  //       setImageURL(data.content);
  //     }
  //   }
  // };

  return (
    <div
      className="flex flex-col w-full m-10 p-4 border border-zinc-900 bg-zinc-600 bg-opacity-20"
      style={{
        borderRadius: "2rem",
        backgroundImage: `url(/three-body.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* TODO: fix image */}
      {/* <Image src={imageURL} alt="image description" width={480} height={1080} /> */}
      <ModalComponent isOpen={isModalOpen} onClose={closeModal} />
      <div className="flex flex-col flex-grow overflow-auto">
        {/* Progress bar section */}
        <div className="py-4 px-8">
          <div className="flex items-center justify-between font-mono pb-4">
            <div>
              <span className="text-xl font-semibold inline-block py-1 px-2 uppercase rounded text-primary-200 bg-black">
                Relationship Temperature with {props.alien.name}
              </span>
            </div>
            <div className="text-right">
              <span
                className="font-semibold inline-block text-primary-200 bg-black text-xl py-1 px-2"
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

        {/* chat history region */}
        <div ref={divRef} className="overflow-auto p-4 flex-grow space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col max-w-[60%] p-2 rounded ${
                message.sender === "You"
                  ? "bg-blue-200 justify-end items-end ml-auto"
                  : "bg-green-200 mr-auto"
              }`}
            >
              <p
                className="font-bold text-2xl"
                style={{ fontFamily: "Nanum Brush Script" }}
              >
                {message.sender}
              </p>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* input region */}
      <div className="flex p-4 w-full justify-center ">
        <div className="flex items-center justify-between rounded-lg overflow-hidden shadow-lg flex-row bg-white w-full">
          <input
            className="flex-grow p-2 text-sm text-zinc-800 placeholder-zinc-500 border-none rounded focus:outline-none"
            placeholder="Write your message..."
            value={myInput}
            onChange={(e) => setMyInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend(myInput, characterDescription);
              }
            }}
          />
          <button
            className="px-4 py-2 text-sm bg-primary-500 text-white font-bold uppercase hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
            onClick={() => handleSend(myInput, characterDescription)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

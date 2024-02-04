import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

type GptResponse = {
  content: string;
};

// Define a type for the messages in the conversation history
type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

// Use the Message type for the conversationHistory array
let conversationHistory: Message[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GptResponse>
) {
  // Check for clear history command
  const { myInput, characterDescription } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ content: "Method Not Allowed" });
  }
  // console.log("hist: ", conversationHistory)

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY, // Replace with your actual API key
    });

    // Initialize conversation history with character description if it's the first request
    if (conversationHistory.length === 0) {
      conversationHistory.push({
        role: "system",
        content: characterDescription,
      });
    }

    // Append new user input to the conversation history
    if (myInput === "reset") {
      conversationHistory = [{
        role: "system",
        content: characterDescription,
      }];
      return res.status(200).json({ content: "Chat history successfully reset." });
      
    } else
      conversationHistory.push({
        role: "user",
        content: myInput,
      });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Append OpenAI's response to the conversation history for continuity
    if (response.choices && response.choices.length > 0 && response.choices[0].message.content !== null) {
      const messageContent = response.choices[0].message.content;
      conversationHistory.push({
        role: "assistant",
        content: messageContent,
      });
      res.status(200).json({ content: messageContent });
    } else {
      res.status(500).json({ content: "Failed to fetch a valid response from OpenAI" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ content: "Internal Server Error" });
  }
}

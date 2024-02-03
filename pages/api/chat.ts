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
  console.log("conversation: ",conversationHistory);
  if (req.method !== "POST") {
    return res.status(405).json({ content: "Method Not Allowed" });
  }

  const { myInput, characterDescription } = req.body;

  try {
    const openai = new OpenAI({
      apiKey: "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", // Replace with your actual API key
    });

    // Initialize conversation history with character description if it's the first request
    if (conversationHistory.length === 0) {
      conversationHistory.push({
        role: "system",
        content: characterDescription,
      });
    }

    // Append new user input to the conversation history
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
  // Keep the commented code as is
  // try {
  //   const response = await fetch('https://api.openai.com/v1/images/generations', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       model: "dalle-2", // Confirm the correct model identifier
  //       prompt: characterDescription,
  //       n: 1, // Number of images to generate
  //       size: "1024x1024",
  //       // Include any other parameters as per the API documentation
  //     }),
  //   });

  //   const data = await response.json();

  //   if (data && data.data && data.data.length > 0) {
  //     // Assuming the API returns a URL or binary data for the image
  //     // You may need to adjust handling based on the actual response structure
  //     const imageUrl = data.data[0].url; // Example for URL handling

  //     // For binary data, you might directly return the image data or download it
  //     res.status(200).json({ imageUrl });
  //   } else {
  //     res.status(500).json({ error: 'Failed to generate image' });
  //   }
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).end('Internal Server Error');
  // }
}

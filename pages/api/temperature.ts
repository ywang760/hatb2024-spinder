import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

type GptResponse = {
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GptResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ content: "Method Not Allowed" });
  }

  const myInput = String(Object.values(req.body)[0]);
  const characterDescription = String(Object.values(req.body)[1]);

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY_PETER,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: characterDescription,
        },
        {
          role: "user",
          content: myInput,
        },
      ],
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Check if response.choices[0].message.content is not null
    if (
      response.choices &&
      response.choices.length > 0 &&
      response.choices[0].message.content !== null
    ) {
      const messageContent = response.choices[0].message.content;
      res.status(200).json({ content: messageContent });
    } else {
      res
        .status(500)
        .json({ content: "Failed to fetch a valid response from OpenAI" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ content: "Internal Server Error" });
  }
}
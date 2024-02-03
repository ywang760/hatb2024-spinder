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

  const { myInput } = req.body;

  try {
    const openai = new OpenAI({
      apiKey: "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",
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "I want you to act like the three-body aliens from three body problem. I want you to respond and answer like the alien using the tone, manner and vocabulary those aliens would use, and think straight forwardly without understanding strategies, cheating, or analogies. Do not write any explanations. Only answer like the aliens.",
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
    if (response.choices && response.choices.length > 0 && response.choices[0].message.content !== null) {
      const messageContent = response.choices[0].message.content;
      res.status(200).json({ content: messageContent });
    } else {
      res.status(500).json({ content: "Failed to fetch a valid response from OpenAI" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ content: "Internal Server Error" });
  }
}

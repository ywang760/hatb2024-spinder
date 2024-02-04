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
  const myInput = Object.values(req.body)[0];
  const characterDescription = Object.values(req.body)[1];
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_API_KEY_PETER,
    });

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: myInput,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data[0].url;
    if (image_url) {
      res.status(200).json({ content: image_url });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ content: "Internal Server Error" });
  }
}

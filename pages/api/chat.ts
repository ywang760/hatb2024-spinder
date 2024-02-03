import { useState } from "react";
import type { NextApiRequest, NextApiResponse } from "next";

type gptResponse = {
  content: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<gptResponse>
) {
  // Handle dialog input submission
  const handleDialogSubmit = async (dialogInput: string) => {
    // // Make API call to ChatGPT 4 API with dialogInput
    // const response = await fetch(
    //   "https://api.chatgpt.com/v1/chat/completions",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer YOUR_API_KEY", // Replace with your ChatGPT 4 API key
    //     },
    //     body: JSON.stringify({
    //       messages: [
    //         {
    //           role: "system",
    //           content: "You: " + dialogInput,
    //         },
    //       ],
    //     }),
    //   }
    // );

    // const data = await response.json();

    // // Extract the generated response from the API
    // const generatedResponse = data.choices[0].message.content;

    // Send the generated response as the API response
    res.status(200).json({ content: dialogInput });
  };

  if (req.method === "POST") {
    const { myInput } = req.body;
    handleDialogSubmit(myInput);
  }
}

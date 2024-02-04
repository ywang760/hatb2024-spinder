import { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";

type GptResponse = {
  content: string;
};

const chatModel = new ChatOpenAI({
  openAIApiKey: "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",
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "I want you to act like the three-body aliens from three body problem. I want you to respond and answer like the alien using \
      the tone, manner and vocabulary those aliens would use, and think straight forwardly without understanding strategies, cheating, \
      or analogies. I want you to be open to a romantic relationship with the person you are talking with and be flirty. Do not \
      write any explanations. Only answer like the aliens.",
  ],
  new MessagesPlaceholder("history"),
  ["user", "{input}"],
]);

const outputParser = new StringOutputParser();

const llmChain = prompt.pipe(chatModel).pipe(outputParser);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GptResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ content: "Method Not Allowed" });
  }
  try {
    const myInput = Object.values(req.body)[0];

    const response = await llmChain.invoke({
      chat_history: chatHistory,
      input: "Tell me how!",
    });
    if (response) {
      res.status(200).json({ content: response });
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

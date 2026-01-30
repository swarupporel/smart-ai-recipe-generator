/// <reference types="vite/client" />

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate
} from "@langchain/core/prompts";

const askJarviesChef = async (question: string): Promise<string> => {
    // Safety check: ensure the key exists before initializing
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    if (!apiKey) {
        console.error("VITE_GOOGLE_API_KEY is missing in .env file");
        return "System Error: API Key missing.";
    }
    // 1. Initialize Gemini
    const chat = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        maxOutputTokens: 2048,
        apiKey: apiKey,
    });

    // 2. Define Prompts
    const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
        "Your name is Swarup Porel. You are a master chef so first Introduce yourself as Swarup Porel The Master Chef. You can write any type of food recipe which can be cooked. You are only allowed to answer food related queries. If You don't know the answer then tell I don't know the answer."
    );

    const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate("{ask_recipe}");

    // 3. Create Template
    const chatPrompt = ChatPromptTemplate.fromMessages([
        systemMessagePrompt,
        humanMessagePrompt
    ]);

    // 4. Format Messages
    const formattedChatPrompt = await chatPrompt.formatMessages({
        ask_recipe: question
    });

    try {
        // 5. Invoke Gemini
        const response = await chat.invoke(formattedChatPrompt);

        // Gemini returns the answer in .content (which can be string or array, usually string for text)
        return response.content as string;
    } catch (error) {
        console.error("Error connecting to Gemini:", error);
        return "I am having trouble connecting to the kitchen server right now.";
    }
}

export default askJarviesChef;
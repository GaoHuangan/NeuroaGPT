import { OpenAI } from "openai";

// Create OpenAI client using Gemini-compatible API endpoint
// ⚠️ Ensure GEMINI_API_KEY is correctly set in your environment
const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

/**
 * Calls the Gemini API to generate a text completion response.
 */
export const openaiService = async (prompt: string) => {
    // Send the chat completion request
    const response = await openai.chat.completions.create({
        model: "gemini-2.0-flash", // lightweight, fast model
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
        ],
    });

    // Return assistant's reply text
    return response.choices[0].message.content;
};

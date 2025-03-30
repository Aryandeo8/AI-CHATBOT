import { asyncHandler } from "../utils/asynchandler.ts";
import { ApiError } from "../utils/apiError.ts";
import {User} from "../models/user.model.ts";
import { ai } from "../config/gemini.ts";


/*
Gemini API example:
async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works",
  });
  console.log(response.text);
}

await main();
*/ 

export const generateChatCompletion = asyncHandler(async (req, res) => {
    const { messages } = req.body;

    if (!messages) {
      throw new ApiError(400,"No messages provided");
    }
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: messages,
      });
      res.status(200).json(response);
    } catch (error) {
      throw new ApiError(500,`Failed to generate chat completion: ${error.message}`);
    }
  });
  
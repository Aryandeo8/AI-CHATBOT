import { asyncHandler } from "../utils/asynchandler.ts";
import { ApiError } from "../utils/apiError.ts";
import {User} from "../models/user.model.ts";
import { ai } from "../config/gemini.ts";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse.ts";


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

export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        throw new ApiError(401,"User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        throw new ApiError(401,"Permissions didn't match");
      }
      return res.status(200).json(new ApiResponse(
        200,
        user.chats,
        "OK"
      )); 
    } catch (error) {
      console.log(error);
      throw new ApiError(200,`Failed to send chats to user: ${error.message}`);
    //{ message: "ERROR", cause: error.message }
    };
};

export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      //user token check
      const user = await User.findById(res.locals.jwtData.id);
      if (!user) {
        throw new ApiError(401,"User not registered OR Token malfunctioned");
      }
      if (user._id.toString() !== res.locals.jwtData.id) {
        throw new ApiError(401,"Permissions didn't match");
      }
      //@ts-ignore
      user.chats = [];
      await user.save();
      return res.status(200).json({ message: "OK" });
    } catch (error) {
      console.log(error);
      throw new ApiError(200,`Failed to delete chats: ${error.message}`);
    }
  };

  
import { Router } from "express";
import { chatCompletionValidator, validate } from "../utils/validators.ts";
import { verifyJWT } from "../middleware/auth.middleware.ts";
import {
    deleteChats,
    generateChatCompletion,
    sendChatsToUser,
} from "../controllers/chat.controller.ts";

const chatRoutes= Router();
chatRoutes.post(
    "/new",
    validate(chatCompletionValidator),
    verifyJWT,
    generateChatCompletion
);
chatRoutes.get("/all-chats", verifyJWT, sendChatsToUser);
chatRoutes.delete("/delete", verifyJWT, deleteChats);

export default chatRoutes;
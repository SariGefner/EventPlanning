import  { Schema, model, models } from "mongoose";

const ChatMessageSchema = new Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    otheruser:{type:String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const ChatMessage = models.ChatMessage || model("ChatMessage", ChatMessageSchema);

export default ChatMessage;

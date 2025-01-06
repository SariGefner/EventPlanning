import MessageChat from '@/app/lib/models/chatmessage';
import connectDb from "@/app/lib/db/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    console.log("post");
    
    try {
        
        const { username, text ,otheruser} = await req.json();
        console.log(username, text ,otheruser);
        
         if (!otheruser) {
            return NextResponse.json({ message: "Field 'otheruser' is required" }, { status: 400 });
        }
        await connectDb();
        const newMessage = new MessageChat({ username, text,otheruser, timestamp: new Date() });
        await newMessage.save();

        return NextResponse.json({ message: "Message saved successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error saving message:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



export async function PUT(req: NextRequest) {
    console.log("put");

    try {
        console.log("put");
        
        const { messageId, newText } = await req.json();
        await connectDb();
        const result = await MessageChat.updateOne({ _id: messageId }, { $set: { text: newText } });

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "Message not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Message updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating message:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

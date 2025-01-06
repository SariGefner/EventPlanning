import connectDb from "@/app/lib/db/connectDb";
import { NextRequest, NextResponse } from "next/server";
import MessageChat from '@/app/lib/models/chatmessage';


export async function DELETE(req: NextRequest, { params }: { params: { messageId: string } }) {
    const { messageId } = params;

    if (!messageId) {
        return NextResponse.json({ message: "messageId is required" }, { status: 400 });
    }

    try {
        await connectDb();
        
        const deletedMessage = await MessageChat.findByIdAndDelete(messageId);

        if (!deletedMessage) {
            return NextResponse.json({ message: "Message not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Message deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting message:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

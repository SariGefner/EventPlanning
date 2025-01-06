"use client";

import React, { useEffect, useRef, useState } from "react";
import { getAllUsers } from "@/app/services/user/getDetails";
import Types from "ably";
import { Realtime } from "ably";
import axios from "axios";
import { MdModeEdit } from "react-icons/md";
import useUserStore from "@/app/store/userModel";
import { getBaseUrl } from "@/app/services/config/axios";

const ably = new Realtime({
  key: "1jLHPA.p9RW9g:MVb0GFzKUviMVC1i5vyIGPqIX4XyGj1Dg_762-7Mw4c",
});

const Chat = () => {
  const [messages, setMessages] = useState<{ _id: string; username: string; text: string }[]>([]);
  const [message, setMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [otherUser, setOtherUser] = useState<string>(""); 
  const [userList, setUserList] = useState<string[]>([]); 
  const [isSending, setIsSending] = useState(false);

  const username = useUserStore((st) => st.user?.userName) || "xxx";
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audio = new Audio("/assets/adio/newmessage.wav");
  const baseUrl = getBaseUrl();

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        const supplierOptions = data.users.map((user: any) => user.userName);
        setUserList(supplierOptions);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!otherUser) return;

    const channelName = getChannelName(username, otherUser);
    const channel = ably.channels.get(channelName);

  
    channel.subscribe("newMessage", (msg: Types.Message) => {
      setMessages((prev) => [...prev, msg.data]);
      if (msg.data.username !== username) {
        audio.play().catch((error) => console.error("Failed to play sound:", error));
      }
    });

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/chat/${otherUser}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    return () => {
      channel.unsubscribe();
    };
  }, [username, otherUser]);

  const getChannelName = (user1: string, user2: string) => {
    const sortedUsers = [user1, user2].sort();
    return sortedUsers.join("_"); 
  };

  const handleSendMessage = async () => {
    if (isSending || !message.trim()) return;
    setIsSending(true);
    try {
      const channelName = getChannelName(username, otherUser);

   
      await axios.post(`${baseUrl}/api/chat`, {
        username,
        text: message,
        otheruser: otherUser,
      });

      
      const channel = ably.channels.get(channelName);
      channel.publish("newMessage", { username, text: message });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleEditMessage = async () => {
    if (!editingMessageId) return;
    try {
      await axios.put(`${baseUrl}/api/chat`, {
        messageId: editingMessageId,
        newText: editingText,
      });
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === editingMessageId ? { ...msg, text: editingText } : msg
        )
      );
      setEditingMessageId(null);
      setEditingText("");
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  const startEditing = (id: string, text: string) => {
    setEditingMessageId(id);
    setEditingText(text);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditingText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (editingText !== "") {
        handleEditMessage();
      } else {
        handleSendMessage();
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSelectUser = (selectedUser: string) => {
    setOtherUser(selectedUser);
    setMessages([]); 
  };

  return (
    <div className="flex flex-col h-[400px] w-[600px] mx-auto bg-[#FFF7F7] shadow-lg rounded-lg border border-[#6C48C5]">

      <div className="bg-[#1230AE] text-[#FFF7F7] py-4 px-6 flex items-center justify-between shadow-sm rounded-t-lg">
        <h2 className="text-lg font-semibold">Select User to Chat</h2>
        <select
          value={otherUser}
          onChange={(e) => handleSelectUser(e.target.value)}
          className="border border-[#6C48C5] rounded-lg p-2 text-[#1230AE] focus:outline-none"
        >
          <option value="">Select a user</option>
          {userList.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      
      {otherUser && (
        <div className="bg-[#1230AE] text-[#FFF7F7] py-4 px-6 flex items-center justify-between shadow-sm rounded-t-lg">
          <h2 className="text-lg font-semibold">Chat with {otherUser}</h2>
        </div>
      )}

     
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FFF7F7]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`group flex items-center gap-2 ${msg.username === username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative max-w-[75%] px-4 py-3 rounded-xl shadow-md ${
                msg.username === username ? "bg-[#6C48C5] text-[#6C48C5]" : "bg-[#1230AE] text-[#FFF7F7]"
              }`}
            >
              {editingMessageId === msg._id ? (
                <div>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full border rounded p-2"
                    onKeyDown={handleKeyDown}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={handleEditMessage} className="text-[#68FE6F]">
                      Save
                    </button>
                    <button onClick={cancelEditing} className="text-[#FF2C2C]">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p>{msg.text}</p>
                  <div className="absolute top-0 right-0 hidden group-hover:flex gap-2 m-4">
                    {msg.username === username && (
                      <button
                        onClick={() => startEditing(msg._id, msg.text)}
                        className="text-[#68FE6F] text-xl"
                      >
                        <MdModeEdit />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

   
      <div className="bg-[#FFF7F7] p-4 flex items-center gap-4 rounded-b-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-[#6C48C5] rounded-lg focus:outline-none focus:ring focus:ring-[#6C48C5]"
        />
        <button
          onClick={handleSendMessage}
          disabled={isSending}
          className="bg-[#6C48C5] text-[#FFF7F7] px-6 py-2 rounded-lg shadow-md hover:bg-[#6C48C5] disabled:opacity-50"
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chat;

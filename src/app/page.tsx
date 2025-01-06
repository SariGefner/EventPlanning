"use client";
import { useState } from "react";
import PostList from "@/app/component/posts/PostList";
import UserList from "@/app/component/users/UserList";

const Home = () => {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto p-6">
        <div className="border-b border-gray-300">
          <div className="flex space-x-6">
            <button
              className={`py-3 px-6 ${activeTab === "users"
                ? "border-b-4 border-[#1230AE] text-[#1230AE] font-semibold"
                : "text-[#6C48C5] hover:text-[#1230AE]"} 
                    transition duration-300 ease-in-out`}
              onClick={() => setActiveTab("users")}
            >
              משתמשים
            </button>
            <button
              className={`py-3 px-6 ${activeTab === "posts"
                ? "border-b-4 border-[#1230AE] text-[#1230AE] font-semibold"
                : "text-[#6C48C5] hover:text-[#1230AE]"} 
                    transition duration-300 ease-in-out`}
              onClick={() => setActiveTab("posts")}
            >
              פוסטים
            </button>
          </div>
        </div>

        <div className="mt-6">
          {activeTab === "users" && <UserList />}
          {activeTab === "posts" && <PostList />}
        </div>
      </div>
    </div>
  );
};

export default Home;
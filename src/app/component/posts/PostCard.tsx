import React, { useState } from "react";
import { PostCardProps } from "@/app/types/post";

const PostCard: React.FC<{ post: PostCardProps }> = ({ post }) => {
  const [showPostModal, setShowPostModal] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("he-IL", options);
  };

  return (
    <div className="post-card bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto mb-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="header mb-6 flex items-center justify-between">
  
        <div>
          <h2 className="text-3xl font-semibold text-[#1230AE] hover:text-[#6C48C5] transition-colors duration-300">
            <a href={`/pages/posts/${post._id.toString()}`}>{post.title}</a>
          </h2>
        </div>
      </div>

      <div className="details space-y-4 text-[#1230AE]">
  
        {post.createDate && (
          <div className="flex justify-between items-center">
            <strong>נוצר בתאריך:</strong>
            <span>{formatDate(post.createDate.toString())}</span>
          </div>
        )}

      
        <div className="flex justify-between items-center">
          <strong>נוצר על ידי:</strong>
          <a
            href={`/pages/users/${post.userName}`}
            className="text-[#1230AE] hover:text-[#6C48C5] transition-colors duration-300"
          >
            {post.userName}
          </a>
        </div>

       
        <div className="flex justify-between items-center">
          <strong>תיאור הפוסט:</strong>
          <span className="text-lg">{post.description}</span>
        </div>

    
        <div className="flex items-center justify-end">
          <a
            href={`/pages/posts/${post._id.toString()}`}
            className="text-lg text-[#1230AE] hover:text-[#6C48C5] flex items-center"
          >
            הראה פוסט מלא
            <span className="ml-2">➔</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

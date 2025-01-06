

'use client';

import React, { useEffect, useState } from 'react';
import { getUserByUsername } from '@/app/services/user/getDetails';
import { Post } from '@/app/types/post';
import defaulPprofileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import { removeUserFromFavorites, addUserToFavorites } from '@/app/services/user/updateDetails';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ChatWithUser from './chatWithUser';

const UserProfileDisplay = ({ username }: { username: string }) => {
  const userNameFromCookie = decodeURIComponent(document.cookie);
  const [user, setUser] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSupplier, setIsSupplier] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserByUsername(username);
        setUser(data);
        setPosts(data.postArr);
        setIsLoggedIn(data.isLoggedIn);
        setIsSupplier(data.isSupplier);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, [username]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await removeUserFromFavorites(user.userName);
      setIsFavorite(false);
    } else {
      await addUserToFavorites(user.userName);
      setIsFavorite(true);
    }
  };

  return (
    <div className="user-profile bg-gradient-to-b from-blue-50 to-gray-100 p-8">
      {user ? (
        <>
          <div className="profile-header bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto mb-8">
            <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">
              פרופיל משתמש: {user.userName}
            </h2>
            <div className="flex flex-col items-center mb-6">
              {user.profileImage ? (
                <Image
                  src={defaulPprofileImage}
                  alt="תמונת פרופיל"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-blue-300 shadow-xl"
                />
              ) : (
                <img
                  src={user.profileImage}
                  alt="תמונת פרופיל"
                  className="rounded-full border-4 border-blue-300 shadow-xl"
                />
              )}
            </div>

            <div className="user-info text-gray-800">
              <div className="mb-3">
                <strong className="text-blue-600">תוארים:</strong> {user?.titles.filter(Boolean).join(", ") || "אין תארים זמינים"}
              </div>
              <div className="mb-3">
                <strong className="text-blue-600">שפות:</strong> {user?.languages.filter(Boolean).join(", ") || "אין שפה זמינה"}
              </div>
              <div className="mb-3">
                <strong className="text-blue-600">תיאור:</strong> {user.description}
              </div>
              {isSupplier && (
                <div className="mb-3">
                  <strong className="text-blue-600">טווח מחירים:</strong> {user.priceRange}
                </div>
              )}
            </div>
          </div>

          <div className="posts bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto mb-8">
            <h3 className="text-3xl font-bold text-blue-700 mb-6">
              פוסטים של {user.userName}
            </h3>
            {posts.length > 0 ? (
              posts.map((post, i) => (
                <div
                  key={i}
                  className="post border-b py-6 last:border-b-0 text-gray-800"
                >
                  <a href={`/pages/posts/${post._id.toString()}`} className="text-xl font-semibold text-blue-500 hover:underline mb-2 block">
                    {post.title}
                  </a>
                  <p className="text-gray-600 mb-2">{post.description}</p>
                  <p className="text-sm text-gray-500">
                    <strong>נוצר בתאריך:</strong>{' '}
                    {new Date(post.createDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">אין פוסטים עדיין</p>
            )}
          </div>

          <div className="contact bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-blue-700 mb-6">פרטי קשר</h3>
            <div className="mb-3">
              <strong className="text-blue-600">מייל:</strong> {user.email}
            </div>
            <div className="mb-3">
              <strong className="text-blue-600">טלפון:</strong> {user.phone}
            </div>
          </div>

          {/* Chat Section */}
          <div className="chat-section bg-white shadow-xl rounded-lg p-8 max-w-3xl mx-auto mt-8">
            <h3 className="text-3xl font-bold text-blue-700 mb-6">צ&quot;אט עם {user.userName}</h3>
            <ChatWithUser otherUser={user.userName} />
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">טוען נתוני משתמש...</p>
      )}

      {userNameFromCookie && (
        <div className="favorite mt-6 flex justify-center">
          <button onClick={toggleFavorite} className={`text-4xl ${isFavorite ? "text-red-600" : "text-gray-400"}`}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDisplay;

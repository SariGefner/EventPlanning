'use client'

import { useState, useEffect } from "react";
import useUserStore from "@/app/store/userModel";
import PostCard from "@/app/component/posts/PostCard";
import '@/app/globals.css'
import { PostCardProps } from "@/app/types/post";

const Home: React.FC = () => {
  const favoriteEvents = useUserStore((state) => state.likedPostsArr);
  const [myEvents, setMyEvents] = useState<PostCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setMyEvents(favoriteEvents);
      setError(null);
    } catch (err) {
      setError('Error loading favorite events');
      console.error('Error updating events:', err);
    } finally {
      setIsLoading(false);
    }
  }, [favoriteEvents]);

  if (isLoading) {
    return (
      <div className="text-center mt-6">
        טוען אירועים...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-6 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div dir="rtl">
      <div className="space-y-6 mt-4">
        <h2 className="page-title">: האירועים שאהבתי</h2>
        {myEvents.length > 0 ? (
          myEvents.map((post: PostCardProps) => (
            <PostCard 
              key={post._id || crypto.randomUUID()} 
              post={post} 
            />
          ))
        ) : (
          <div className="text-center mt-6">
            אין אירועים אהובים עדיין
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;
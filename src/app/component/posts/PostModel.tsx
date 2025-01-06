import React, { useState } from 'react';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { PostCardProps } from '@/app/types/user';
import { Recommendation } from '@/app/types/post';
import useUserStore from '@/app/store/userModel';
import { addPostToFavorites, removePostToFavorites } from '@/app/services/user/post';
import { addRecommendation } from '@/app/services/post/post';
import ImageGallery from './ImageGallry';

const PostView: React.FC<{ post: PostCardProps }> = ({ post }) => {
  const { likedPostsArr, setLikedPostsArr } = useUserStore();
  const userNameFromCookie = decodeURIComponent(document.cookie);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(decodeURIComponent(document.cookie) ? true : false);
  const [comments, setComments] = useState<Recommendation[]>(post.recommendations || []);
  const [rating, setRating] = useState<number>(0); 
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isFavorite, setIsFavorite] = useState(
    likedPostsArr.some((favoritePost) => favoritePost._id === post._id)
  );
  const [showAddComment, setShowAddComment] = useState(false); 

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1); 
  };
  const addComment = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      try {
        const newComment = await addRecommendation(post._id, commentText, rating);
        setComments((prevComments) => [...prevComments, newComment.recommendation]);
        setCommentText(""); 
        setRating(0); 
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

 
  const toggleFavorite = async () => {
    if (isFavorite) {
     
      await removePostToFavorites(post._id);
      setLikedPostsArr(likedPostsArr.filter((favoritePost) => favoritePost._id !== post._id));
      setIsFavorite(false); 
    } else {
      
      await addPostToFavorites(post._id);
      setLikedPostsArr([...likedPostsArr, post]); 
      setIsFavorite(true); 
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('he-IL', options);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
   
        <h1 className="text-3xl font-bold text-[#1230AE] mb-4">{post.title}</h1>

        {post.createDate && (
          <p className="text-sm text-[#6C48C5] mb-4">
            נוצר בתאריך: {formatDate(post.createDate.toString())}
          </p>
        )}

    
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <Link
              href={`/pages/users/${post.userName}`}
              className="text-[#1230AE] hover:underline"
            >
              {post.userName}
            </Link>
          </div>
          <div className="text-sm text-[#6C48C5]">({post.userDetails?.titles?.join(', ')})</div>
        </div>

    
        <p className="text-[#1230AE] mb-6">{post.description}</p>

        
        {<ImageGallery postUsername={post.userName} postId={post._id} images={post.album} />}

        {post.postId && (
          <div className="consumer-details mb-6">
            <h2 className="text-lg font-semibold text-[#1230AE] mb-2">פרטי הפוסט:</h2>
            <p className="text-sm text-[#6C48C5]">קטגוריה: {post.postId.eventCategory}</p>
            <p className="text-sm text-[#6C48C5]">תקציב: {post.postId.budget} ₪</p>
            <h3 className="text-md font-semibold text-[#1230AE] mt-4">ספקים:</h3>
            <ul>
              {post.postId.supplierNameArr?.map((supplier: string, index: number) => (
                <li key={index} className="text-sm text-[#6C48C5]">
                  <Link href={`/pages/users/${supplier}`} className="text-[#1230AE] hover:underline">
                    {supplier}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

       
        <div className="comments mb-6">
          <h2 className="text-lg font-semibold text-[#1230AE] mb-2">תגובות והמלצות</h2>
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="text-[#1230AE] flex items-center gap-2 mb-4"
          >
            {showComments ? (
              <>
                <FaChevronUp /> סגור תגובות
              </>
            ) : (
              <>
                <FaChevronDown /> הצג תגובות
              </>
            )}
          </button>
          {showComments && (
            <ul className="space-y-4 mt-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <li key={index} className="border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Link href={`/pages/users/${comment.userName}`} className="text-[#1230AE] hover:underline">
                        {comment.userName}
                      </Link>
                      <span className="text-sm text-[#6C48C5]">⭐ {comment.rate}/5</span>
                    </div>
                    <p className="text-[#1230AE] mt-1">{comment.text}</p>
                  </li>
                ))
              ) : (
                <p className="text-sm text-[#6C48C5]">אין תגובות עדיין.</p>
              )}
            </ul>
          )}

          <button
            onClick={() => setShowAddComment((prev) => !prev)}
            className="mt-4 text-[#1230AE] flex items-center gap-2"
          >
            {showAddComment ? (
              <FaChevronUp /> 
            ) : (
              <FaChevronDown /> 
            )}
            הוסף תגובה
          </button>

         
          {showAddComment && (
            <div className="add-comment mt-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="text"
                      value={commentText}
                      onChange={handleCommentChange}
                      className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1230AE]"
                      placeholder="הוסף תגובה"
                    />
                    <div className="rating flex gap-1">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          onClick={() => handleStarClick(index)}
                          className={`cursor-pointer text-2xl ${rating > index ? "text-yellow-400" : "text-[#6C48C5]"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={addComment}
                    className="px-4 py-2 bg-[#1230AE] text-white rounded-md shadow-md"
                  >
                    הוסף תגובה
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="mt-2 px-4 py-2 bg-[#1230AE] text-white rounded-md"
                >
                  התחבר להוספת תגובה
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* כפתור מועדפים */}
      {userNameFromCookie && <div className="favorite mt-6">
        <button onClick={toggleFavorite} className={`text-2xl ${isFavorite ? "text-red-500" : "text-gray-400"}`}>
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>}
    </div>
  );
};

export default PostView;
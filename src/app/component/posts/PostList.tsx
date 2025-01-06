"use client";
import { PostCardProps, EventCategory } from "@/app/types/post";
import SearchBar from "@/app/component/SearchBar";
import usePostStore from "@/app/store/postStore";
import "@/app/css/posts/customStyles.css";
import React, { useState, useEffect } from "react";
import { getAllPosts } from "@/app/services/post/post";
import PostCard from "./PostCard";
import "@/app/globals.css";
import "@/app/css/posts/customStyles.css";


const PostList = () => {
  const { posts, setPosts } = usePostStore();
  const [postss, setPostss] = useState<PostCardProps[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostCardProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [noMorePosts, setNoMorePosts] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);

  const loadPosts = async () => {
    if (loading || noMorePosts) return;

    setLoading(true);
    try {
      const data = await getAllPosts(page, 10);

      if (data.posts.length === 0) {
        setNoMorePosts(true);
        return;
      }

      const newPosts = data.posts.filter(
        (post: { postId: any }) =>
          !posts.some((existingPost) => existingPost.postId === post.postId)
      );

      if (newPosts.length < 10) {
        setNoMorePosts(true);
      }

      setPosts(newPosts);
      setPostss((prevPosts) => [...prevPosts, ...newPosts]);
      setFilteredPosts((prevFiltered) => [...prevFiltered, ...newPosts]);

      setTotalPages(data.totalPages);

    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (
    userName: string,
    eventTitle: string,
    eventType: EventCategory,
    startDate: string,
    endDate: string,
    description: string
  ) => {
    const results = posts.filter((post) => {
      const matchUserName = post.userName.toLowerCase().includes(userName.toLowerCase());
      const matchEventTitle = post.title.toLowerCase().includes(eventTitle.toLowerCase());
      const matchEventType = eventType ? post.postId?.eventCategory === eventType : true;
      const matchDescription = post.description?.toLowerCase().includes(description.toLowerCase());
      const postDate = new Date(post.createDate);
      const isWithinDateRange =
        (!startDate || postDate >= new Date(startDate)) &&
        (!endDate || postDate <= new Date(endDate));

      return (
        matchUserName &&
        matchEventTitle &&
        matchEventType &&
        matchDescription &&
        isWithinDateRange
      );
    });
    setFilteredPosts(results);
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  return (
    <div className="posts-container relative">

      <h1 className="posts-title text-[#1230AE] text-center">פוסטים</h1>

      {/* <div className="max-w-3xl mx-auto mb-6"> */}
      <div className="search-bar-container absolute top-0 right-0 p-4 transform translate-x-1/2">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="posts-list mt-8">

        {filteredPosts.map((post: PostCardProps, index: number) => (
          <PostCard key={index} post={post} />
        ))}
      </div>

      {loading && <div className="loading-text text-[#6C48C5]">טוען...</div>}
      {noMorePosts && <div className="no-more-posts-text text-[#6C48C5]">אין יותר פוסטים לטעון</div>}

      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          className="pagination-arrow text-[#1230AE] text-xl p-3 rounded-full hover:bg-[#C68FE6] disabled:text-[#6C48C5] disabled:bg-transparent"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          ↑
        </button>
        <span className="font-semibold text-[#1230AE] text-lg">
          עמוד {page} מתוך {totalPages}
        </span>
        <button
          className="pagination-arrow text-[#1230AE] text-xl p-3 rounded-full hover:bg-[#C68FE6] disabled:text-[#6C48C5] disabled:bg-transparent"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default PostList;

'use client';
import React, { useEffect, useState } from 'react';
import PostModel from '@/app/component/posts/PostModel';
import { useParams } from 'next/navigation';
import { getPostDetails } from '@/app/services/post/post';

const Page = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("postId:", postId);
    if (!postId) {
      console.error("postId is undefined");
      return;
    }
    const fetchPost = async () => {
      try {

        const decodedPostId = decodeURIComponent(postId as string);   
        const fetchedPost = await getPostDetails(decodedPostId);
        setPost(fetchedPost.post);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <PostModel post={post}  />
    </div>
  );
};

export default Page;

import { create } from 'zustand';
import { PostCardProps } from '../types/user';


const fetchPostsFromServer = async (): Promise<PostCardProps[]> => {
  const response = await fetch('/api/posts');
  const data = await response.json();
  return data;
};

interface PostStore {
  posts: PostCardProps[];
  setPosts: (posts: PostCardProps[]) => void;
  getPostByIndex: (selectIndexPost: number) => PostCardProps | null;
  loadPostsIfEmpty: () => Promise<void>; 
}

const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),

  getPostByIndex: (selectIndexPost) => {
    const { posts } = get();
    if (selectIndexPost >= 0 && selectIndexPost < posts.length) {
      return posts[selectIndexPost];
    }
    return null;
  },

  loadPostsIfEmpty: async () => {
    const { posts, setPosts } = get();
    if (posts.length === 0) {
      const newPosts = await fetchPostsFromServer();
      setPosts(newPosts);
    }
  },
}));

export default usePostStore;

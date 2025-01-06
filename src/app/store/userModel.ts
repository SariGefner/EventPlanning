import { create } from 'zustand';
import {  UserFormData } from "@/app/types/user"; 
import { PostCardProps } from '../types/post';

interface UserStore {
    user: UserFormData | null,
    likedPostsArr: PostCardProps[],
    likedPeople: string[],
    postArr: PostCardProps[],
    setUser: (newUser: UserFormData) => void;
    setLikedPostsArr: (newPost: PostCardProps | PostCardProps[]) => void;
    setLikedPeople: (newPeople: string | string[]) => void;
    setPostArr: (newPost: PostCardProps | PostCardProps[]) => void;
    isReady: boolean;
    setReady: (ready: boolean) => void;
    clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    likedPostsArr: [],
    likedPeople: [],
    postArr: [],
    setUser: (newUser: UserFormData) => {
        set({ user: newUser })
    },
    setLikedPostsArr: (newPosts: PostCardProps | PostCardProps[]) =>
        set((state) => {
            const postsToAdd = Array.isArray(newPosts) ? newPosts : [newPosts];
            const updatedPosts = [...state.likedPostsArr, ...postsToAdd].filter(
                (post, index, arr) => arr.findIndex((p) => p._id === post._id) === index
            );
            return { likedPostsArr: updatedPosts };
        }),
    setPostArr: (newPosts: PostCardProps | PostCardProps[]) =>
        set((state) => {
            const postsToAdd = Array.isArray(newPosts) ? newPosts : [newPosts];
            const updatedPosts = [...state.postArr, ...postsToAdd].filter(
                (post, index, arr) => arr.findIndex((p) => p._id === post._id) === index
            );
            return { postArr: updatedPosts };
        }),

    setLikedPeople: (newPeople: string | string[]) =>
        set((state) => ({
            likedPeople: Array.isArray(newPeople) ? [...state.likedPeople, ...newPeople] : [...state.likedPeople, newPeople],
        })),
    isReady: false,
    setReady: (ready: boolean) => set({ isReady: ready }),
    clearUser: () => set({ user: null, likedPostsArr: [], likedPeople: [], postArr: [] , isReady: false,}),
}));

export default useUserStore;
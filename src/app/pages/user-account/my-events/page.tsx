"use client";

import AddPost from "@/app/component/posts/AddPost";
import PopUpWindow from "@/app/component/pop-upWindow";
import { Post, PostCardProps } from "@/app/types/post";
import { useEffect, useState } from "react";
import useUserStore from "@/app/store/userModel";
import PostCard from "@/app/component/posts/PostCard";
import "@/app/globals.css";
import useModalStore from "@/app/store/modelStore";

const Home: React.FC = () => {
    const openModal = useModalStore(
        (state: { openModal: any }) => state.openModal
    );
    const isModalOpen = useModalStore(
        (state: { isModalOpen: any }) => state.isModalOpen
    );
    const postArr = useUserStore((state) => state.postArr);
    const [MyEvents, setMyEvents] = useState<PostCardProps[]>(postArr);

    const handleAddEvent = () => {
        if (!isModalOpen) {
            openModal();
        }
    };

    useEffect(() => {
        setMyEvents(postArr);
    }, [postArr]);

    return (
        <div dir="rtl" className="flex-col items-center">
            <PopUpWindow>
                <AddPost />
            </PopUpWindow>

            <div className="space-y-6 mt-4 w-full">
                <h1 className="page-title text-[#1230AE] font-bold text-xl text-center">האירועים שלי:</h1>
                <div className="space-y-4">
                    {MyEvents.map((post: PostCardProps, index: number) => {
                        return <PostCard key={index} post={post} />;
                    })}
                </div>
            </div>

            {/* כפתור הוספת פוסט עם אייקון פלוס בסוף */}
            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    onClick={() => handleAddEvent()}
                    className="bg-[#1230AE] text-white font-semibold text-2xl rounded-full p-6 shadow-lg hover:bg-[#6C48C5] transition duration-300 flex items-center justify-center"
                >
                    <span className="material-icons">+</span>
                </button>
            </div>
        </div>


    );
};
export default Home;

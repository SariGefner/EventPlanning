"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // for client-side navigation
import { useSession } from "next-auth/react"; // for authentication state
import PopUpWindow from "./pop-upWindow";
import Login from "./users/register/login";
import useModalStore from "../store/modelStore";

const TimerComponent = () => {
    const { data: session, status } = useSession(); 
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const openModal = useModalStore((state) => state.openModal);
    const closeModal = useModalStore((state) => state.closeModal);
    const router = useRouter(); 
    useEffect(() => {
       
        if (status === "authenticated") {
            if (isModalOpen) closeModal(); 
            return;
        }

    
        const userNameFromCookie = decodeURIComponent(document.cookie || "");
        if (!userNameFromCookie && !isModalOpen) {
            openModal();
        }

        const intervalId = setInterval(() => {
            const userNameFromCookie = decodeURIComponent(document.cookie || "");
            if (!userNameFromCookie) {
                openModal(); 
            }
        }, 120000); 

        return () => clearInterval(intervalId); 
    }, [status, router]);

    if (!isModalOpen) return null;

    return (
        <div>
           
                <Login />
            
        </div>
    );
};

export default TimerComponent;

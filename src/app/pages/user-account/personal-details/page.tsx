'use client';

import ShowUserPersonalDetails from "@/app/component/users/showUserPersonalDetails";
import UpdateUserPersonalDetails from "@/app/component/users/updateUserPersonalDetails";
import useUserStore from "@/app/store/userModel";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
    console.log("page personal details");
    const userDetails = useUserStore((state) => state.user);

    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        console.log("Updated userDetails:", userDetails);
    }, [userDetails]);

    return (
        <div dir="rtl" className=" min-h-screen flex justify-center items-center py-6">
            {userDetails ? (
                <div className="bg-[FFF7F7] p-8 rounded-lg shadow-lg w-full max-w-3xl border border-[#6C48C5]">
                    <ShowUserPersonalDetails user={userDetails} />
                    <div className="mt-6 flex justify-center">
                        <button 
                            onClick={() => setShowUpdateForm((prev) => !prev)} 
                            className="w-full bg-[#6C48C5] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#1230AE] focus:outline-none focus:ring-2 focus:ring-[#1230AE] focus:ring-offset-2 text-lg font-semibold transition duration-300">
                            {showUpdateForm ? "הסתר טופס עדכון" : "עדכן פרטים"}
                        </button>
                    </div>

                    {showUpdateForm && (
                        <div className="mt-6">
                            <UpdateUserPersonalDetails user={userDetails} />
                        </div>
                    )}
                </div>
            ) : (
                <p className="text-[#1230AE] text-xl text-center">לא נמצאו נתונים של משתמש, אנא התחבר לחשבון משתמש</p>
            )}
        </div>
    );
};

export default Home;

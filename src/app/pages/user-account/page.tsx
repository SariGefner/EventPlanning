'use client';
import PostList from '@/app/component/posts/PostList';
import UserList from '@/app/component/users/UserList';
import { getMyDetails } from '@/app/services/user/getDetails';
import { useUpdateUserStore } from '@/app/services/user/registerUser';
import useNavbarStore from '@/app/store/navbarStore';
import useUserStore from '@/app/store/userModel';
import { UserFormData } from '@/app/types/user';
import { useEffect, useState } from 'react';

const Home = () => {
    const updateUserStore = useUpdateUserStore();
    const storeUser = useUserStore((state) => state.user);
    const toggleNavbar = useNavbarStore((state) => state.toggleNavbar);
    const [activeTab, setActiveTab] = useState("users");

    useEffect(() => {
        const getMyPersonalDetails = async () => {
            toggleNavbar(true)
            if (useUserStore.getState().isReady) return;
            if(storeUser) return;
            try {
                const userDetails = await getMyDetails();
                const user: UserFormData = {
                    firstName: userDetails.user.firstName,
                    lastName: userDetails.user.lastName,
                    userName: userDetails.user.userName,
                    email: userDetails.user.email,
                    password: '',
                    titles: userDetails.user.titles,
                    phone: userDetails.user.phone,
                    languages: userDetails.user.languages,
                    address: { ...userDetails.user.addressId },
                    description: userDetails.user.description,
                    profileImage: userDetails.user.profileImage,
                };
                updateUserStore(
                    user,
                    userDetails.user.likedPostsArr,
                    userDetails.user.likedPeople,
                    userDetails.user.postArr
                );
            } catch (error) {
                console.error('Failed to fetch user details:', error);
            }
        }
        getMyPersonalDetails()
    }, [])

    return (
        <div className=" min-h-screen">
            <div className="container mx-auto p-6">
                <div className="border-b border-gray-300">
                    <div className="flex space-x-6">
                        <button
                            className={`py-3 px-6 ${activeTab === "users"
                                ? "border-b-4 border-[#1230AE] text-[#1230AE] font-semibold"
                                : "text-[#6C48C5] hover:text-[#1230AE]"} 
                            transition duration-300 ease-in-out`}
                            onClick={() => setActiveTab("users")}
                        >
                            משתמשים
                        </button>
                        <button
                            className={`py-3 px-6 ${activeTab === "posts"
                                ? "border-b-4 border-[#1230AE] text-[#1230AE] font-semibold"
                                : "text-[#6C48C5] hover:text-[#1230AE]"} 
                            transition duration-300 ease-in-out`}
                            onClick={() => setActiveTab("posts")}
                        >
                            פוסטים
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    {activeTab === "users" && <UserList />}
                    {activeTab === "posts" && <PostList />}
                </div>
            </div>
        </div>
    );
};

export default Home;

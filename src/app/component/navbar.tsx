'use client';
import Link from "next/link";

import profileImage from '@/app/assets/images/defaultConsumerProfile.png';
import Image from 'next/image';
import { checkIfLoggedIn, updateUserStore } from '@/app/services/user/registerUser';
import useNavbarStore from '../store/navbarStore';
import useUserStore from '../store/userModel';
import useModalStore from '../store/modelStore';
import Logo from '@/app/assets/images/logo.png';
import { useEffect, useState } from 'react';
import { getMyDetails } from '@/app/services/user/getDetails';
import { UserFormData } from '../types/user';
import { Home, Info, LogIn } from "lucide-react";
import Swal from "sweetalert2";

const Navbar = () => {
  let userDet = useUserStore((state) => state.user);
  const { toggleNavbar } = useNavbarStore();
  const [openSideBar, setOpenSideBar] = useState<boolean>(true);
  const openModal = useModalStore((state) => state.openModal);
  const storeUser = useUserStore((state) => state.user);

  useEffect(() => {
    const getMyPersonalDetails = async () => {
      toggleNavbar(true);
      if (useUserStore.getState().isReady) return;
      if (storeUser) return;
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
        userDet = userDetails.user;
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    const userName = checkIfLoggedIn();
    if (!userDet && userName) {
      getMyPersonalDetails();
    }
  }, [userDet]);

  const handleProfileClick = () => {
    if (checkIfLoggedIn()) {
      setOpenSideBar(!openSideBar);
      toggleNavbar(openSideBar);
    } else {
      openModal();
    }
  };

  const handleLoginClick = () => {
    if (checkIfLoggedIn()) {
      Swal.fire({
        title: 'כבר מחובר',
        text: 'אתה כבר מחובר לחשבון משתמש, לאחר יציאה ניתן להתחבר שוב.',
        icon: 'info',
        confirmButtonText: 'הבנתי',
      });
    } else {
      openModal();
    }
  };

  return (
  
    <div className="fixed top-0 left-0 right-0 w-full bg-[#6C48C5] shadow-md z-50 h-[105px]">
  <nav className="flex justify-between items-center p-4 max-w-screen-2xl mx-auto relative h-full">
    {/* Profile Section */}
    <div className="order-1 flex items-center gap-4 cursor-pointer">
      <div className="flex flex-col items-center" onClick={handleProfileClick}>
        {checkIfLoggedIn() && userDet?.profileImage ? (
          <img
            src={userDet.profileImage}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full border-2 border-white mb-2"
          />
        ) : (
          <Image
            src={profileImage}
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full border-2 border-white mb-2"
          />
        )}
        <div className="text-center">
          {checkIfLoggedIn() && userDet ? (
            <span className="text-white text-sm font-medium font-bold">
              {userDet.firstName} {userDet.lastName}
            </span>
          ) : (
            <span className="text-white text-sm font-medium font-bold">הפרופיל שלי</span>
          )}
        </div>
      </div>
    </div>

    <div className="absolute inset-x-0 text-center">
      <div className="flex items-center justify-center gap-6">
        <Link href="/" className="flex items-center gap-1 text-white hover:text-[#101f61] transition-colors">
          דף הבית
          <Home className="h-4 w-4" />
        </Link>
        <Link
          href="/pages/about"
          className="flex items-center gap-2 text-white hover:text-[#101f61] transition-colors"
        >
          אודות האתר
          <Info className="h-4 w-4" />
        </Link>
        <button
          onClick={handleLoginClick}
          className="flex items-center gap-2 text-white hover:text-[#101f61] transition-colors"
        >
          התחברות
          <LogIn className="h-4 w-4" />
        </button>
      </div>
    </div>

    {/* Logo */}
    <div className="order-2">
      <Image
        src={Logo}
        alt="חגיגה מושלמת Logo"
        height={48}
        width={130}
        priority
        className="hover:opacity-90 transition-opacity"
      />
    </div>
  </nav>
</div>

  );
};

export default Navbar;

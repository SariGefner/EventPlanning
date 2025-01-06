'use client';

import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import useNavbarStore from '@/app/store/navbarStore';
import useUserStore from '@/app/store/userModel';
import { logout } from '@/app/services/user/registerUser';

import {
  Home,
  User,
  Calendar,
  Heart,
  Bell,
  MessageSquare,
  LogOut
} from 'lucide-react';

const ConsumerNavbar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const clearUser = useUserStore((state) => state.clearUser);
  const { isOpen } = useNavbarStore();
  const { toggleNavbar } = useNavbarStore();

  const exite = async () => {
    if (session?.user) {
      await signOut({ redirect: false });
      await logout();
      toggleNavbar(false);
      toggleNavbar(false);
    } else {
      await logout();
      toggleNavbar(false);
      toggleNavbar(false);
    }

    clearUser();
    router.push('/');
  };

  if (!isOpen) return null;

  return (
    <div>
      <nav className="flex-1 px-4 pt-0 space-y-4 overflow-y-auto bg-[#6C48C5]">
        <Link href="/pages/user-account"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg font-bold">דף הבית</span>
          <Home className="h-6 w-6" />
        </Link>

        <Link href="/pages/user-account/personal-details"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg font-bold">פרטים אישיים</span>
          <User className="h-6 w-6" />
        </Link>

        <Link href="/pages/user-account/my-events"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg font-bold">האירועים שלי</span>
          <Calendar className="h-6 w-6" />
        </Link>

        <Link href="/pages/user-account/favorite-event"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg font-bold">האירועים שאהבתי</span>
          <Heart className="h-6 w-6" />
        </Link>

        <Link href="/pages/user-account/reminders"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg font-bold">התזכורות שלי</span>
          <Bell className="h-6 w-6" />
        </Link>

        <Link href="/pages/user-account/message-box"
          className="flex items-center justify-end gap-3 p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg font-bold">תיבת הודעות</span>
          <MessageSquare className="h-6 w-6" />
        </Link>
        <button
          onClick={exite}
          className="flex items-center justify-end gap-3 w-full p-3 text-white hover:bg-white/10 rounded-lg transition-colors">
          <span className="text-lg font-bold">יציאה</span>
          <LogOut className="h-6 w-6" />
        </button>
      </nav>
      <div className="h-[50px] transition-colors"></div>
    </div>
  );
};

export default ConsumerNavbar;
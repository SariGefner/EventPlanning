'use client'
import React from 'react';
// השתמש ב-useParams מ-next/navigation
import UserProfileDisplay from '@/app/component/users/userProfileDisplay';
import { useParams } from 'next/navigation';  // השתמש ב-useParams
import '@/app/globals.css'

const Page = () => {
  const { userName } = useParams();  // השגת שם המשתמש מתוך ה-params

  // בצע פירוש URL כדי להמיר את הקידוד
  const decodedUserName = decodeURIComponent(userName as string);

  if (!decodedUserName) return <div>טוען...</div>; // אם עדיין לא קיבלנו את שם המשתמש


  return (
    <div className='centered'>
      <a href={`/pages/user-account`} className="button-primary  width-10%;">
        חזור לפרופיל שלך
      </a>
      <br></br>
      {/* הצגת פרופיל המשתמש */}
      <UserProfileDisplay username={decodedUserName} />
    </div>
  );
};

export default Page;

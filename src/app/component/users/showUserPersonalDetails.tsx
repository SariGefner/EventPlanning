'use client';

import React from 'react';
import { ShowUserPersonalDetailsProps } from '@/app/types/user';

const ShowUserPersonalDetails: React.FC<ShowUserPersonalDetailsProps> = ({ user }) => {
  return (

    <div className="user-details bg-white p-8 rounded-lg shadow-2xl max-w-3xl w-full border border-[#6C48C5]">
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-bold text-[#1230AE]">{user?.firstName} {user?.lastName}</h1>
      </div>

      <div className="space-y-6">
        {/* פרטי משתמש */}
        <div className="flex justify-between text-[#1230AE] text-lg">
          <strong className="font-semibold">שם משתמש:</strong>
          <span>{user?.userName}</span>
        </div>
        <div className="flex justify-between text-[#1230AE] text-lg">
          <strong className="font-semibold">אימייל:</strong>
          <span>{user?.email}</span>
        </div>
        <div className="flex justify-between text-[#1230AE] text-lg">
          <strong className="font-semibold">טלפון:</strong>
          <span>{user?.phone}</span>
        </div>
        <div className="flex justify-between text-[#1230AE] text-lg">
          <strong className="font-semibold">שפות:</strong>
          <span>{user?.languages.filter(Boolean).join(", ") || "אין שפה זמינה"}</span>
        </div>
        <div className="flex justify-between text-[#1230AE] text-lg">
          <strong className="font-semibold">תארים:</strong>
          <span>{user?.titles.filter(Boolean).join(", ") || "אין תארים זמינים"}</span>
        </div>
        <div className="flex justify-between text-[#1230AE] text-lg">
          <strong className="font-semibold">תיאור:</strong>
          <span>{user?.description}</span>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-[#1230AE] mb-4">כתובת:</h3>
        <div className="flex justify-between text-[#1230AE] text-lg">
          <span>{user?.address?.street}, {user?.address?.building}, {user?.address?.city}, {user?.address?.zipCode}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowUserPersonalDetails;

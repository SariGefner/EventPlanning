'use client';

import { useState } from 'react';
import Login from "@/app/component/users/register/login"

export default function NewUserError() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4"> גישה נדחתה</h1>
        <p className="mb-4"> אתה לא רשום במערכת , בבקשה צור חשבון קודם </p>
        
        {!showLogin ? (
          <button 
            onClick={handleLoginClick} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

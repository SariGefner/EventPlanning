'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useModalStore from '@/app/store/modelStore';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { newPassword } from '@/app/services/user/registerUser';

const ResetPassword: React.FC<{ otp: string; email: string }> = ({ otp, email }) => {
    const [myNewPassword, setMyNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setshowPassword] = useState(false);
    const [showconfirmPassword, setshowconfirmPassword] = useState(false);
    const closeModal = useModalStore((state: { closeModal: any; }) => state.closeModal);
    const router = useRouter();

    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (myNewPassword !== confirmPassword) {
            setErrorMessage('הסיסמאות אינן תואמות');
            return;
        }

        try {
            console.log('סיסמה חדשה:', myNewPassword);
            const result = await newPassword(email, otp, myNewPassword)
            console.log(result);
            router.push('/pages/consumer-account');
            closeModal()

        } catch (error) {
            console.error('Error during password reset:', error);
            setErrorMessage('הייתה שגיאה בשינוי הסיסמה');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
            <h2 className="text-center text-[#1230AE] text-2xl font-semibold mb-6">שנה את הסיסמה שלך</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="relative">
                    <label htmlFor="newPassword" className="block font-medium">
                        סיסמה חדשה
                    </label>
                    <input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={myNewPassword}
                        onChange={(e) => setMyNewPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                        onPaste={(e) => e.preventDefault()} 
                        onCopy={(e) => e.preventDefault()} 
                        onCut={(e) => e.preventDefault()}  
                    />
                    <button
                        type="button"
                        onClick={() => { setshowPassword(!showPassword) }}
                        className="absolute top-2/3 left-3 -translate-y-1/2 flex items-center text-gray-500">

                        {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />} 
                    </button>
                </div>
                <div className="relative">
                    <label htmlFor="confirmPassword" className="block font-medium">
                        אשר סיסמה חדשה
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showconfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                        onPaste={(e) => e.preventDefault()} 
                        onCopy={(e) => e.preventDefault()} 
                        onCut={(e) => e.preventDefault()}  
                    />
                    <button
                        type="button"
                        onClick={() => { setshowconfirmPassword(!showconfirmPassword) }}
                        className="absolute top-2/3 left-3 -translate-y-1/2 flex items-center text-gray-500">
                        {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />} 
                    </button>
                </div>
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <button
                    type="submit"
                    className="w-full py-2 bg-[#1230AE] text-white rounded-md hover:bg-[#6C48C5]"
                >
                    עדכן סיסמה
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;

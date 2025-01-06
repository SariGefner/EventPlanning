import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useModalStore from '@/app/store/modelStore';
import { singIn } from '@/app/services/user/registerUser';
import LoginWithGoogle from '@/app/component/users/register/loginWithGoogle';
import axios from 'axios';
import { IoEyeOffOutline } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import '@/app/globals.css'; 

const LoginWithPassword: React.FC<{ onForgetPassword: (email: string) => void; onNewUser: () => void }> = ({ onForgetPassword, onNewUser }) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const closeModal = useModalStore((state) => state.closeModal);
    const [showPassword, setshowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { userName, email, password } = e.currentTarget.elements as any;

        try {
            console.log(userName, email, password);

            const result = await singIn(email.value, userName.value, password.value);
            console.log(result);
            router.push('/pages/user-account');
            closeModal();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(`Error: ${error.message}`);
            } else {
                setErrorMessage('Error logging in.');
            }
        }
    };

    return (
        <div className="bg-[#FFF7F7] p-6 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-center text-[#1230AE] text-2xl font-semibold mb-6">התחבר לחשבון שלך</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="userName" className="block font-medium text-[#1230AE]">שם משתמש</label>
                        <input
                            id="userName"
                            name="userName"
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md border-[#C68FE6] focus:ring-[#6C48C5] focus:border-[#6C48C5]"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block font-medium text-[#1230AE]">אימייל</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-3 py-2 border rounded-md border-[#C68FE6] focus:ring-[#6C48C5] focus:border-[#6C48C5]"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block font-medium text-[#1230AE]">סיסמה</label>
                        <button
                            type="button"
                            onClick={() => { setshowPassword(!showPassword) }}
                            className="absolute top-2/3 left-3 -translate-y-1/2 flex items-center text-[#6C48C5]"
                        >
                            {showPassword ? <IoEyeOffOutline /> : <MdOutlineRemoveRedEye />}
                        </button>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="w-full px-3 py-2 border rounded-md border-[#C68FE6] focus:ring-[#6C48C5] focus:border-[#6C48C5]"
                            onPaste={(e) => e.preventDefault()} 
                            onCopy={(e) => e.preventDefault()} 
                            onCut={(e) => e.preventDefault()}  
                        />
                    </div>
                    {errorMessage && <p className="text-red-500 text-center mt-2">{errorMessage}</p>}
                    <button type="submit" className="w-full py-2 bg-[#1230AE] text-white rounded-md hover:bg-[#6C48C5]">
                        התחבר
                    </button>
                    <LoginWithGoogle />
                </form>
                <p className="text-center mt-4 text-[#1230AE]">
                    שכחת סיסמה?{' '}
                    <button
                        type="button"
                        onClick={() => onForgetPassword(email)}
                        className="text-[#6C48C5] hover:underline"
                    >
                        איפוס סיסמה
                    </button>
                </p>
                <p className="text-center text-[#1230AE]">
                    אין לך חשבון?{' '}
                    <button
                        type="button"
                        onClick={onNewUser} 
                        className="text-[#6C48C5] hover:underline"
                    >
                        הירשם כאן
                    </button>
                </p>
            </div>
        </div>

    );
};

export default LoginWithPassword;

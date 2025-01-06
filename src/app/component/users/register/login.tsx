"use client";

import React, { useState } from "react";
import LoginWithPassword from "@/app/component/users/register/loginWithPassword";
import EnterCodeFromEmail from "@/app/component/users/register/enterCodeFromEmail";
import { forgetPassword } from "@/app/services/user/registerUser";
import Register from "./register";
import ResetPassword from "@/app/component/users/register/newPassword";
import "@/app/globals.css";
import useModalStore from "@/app/store/modelStore";

const Login: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<
        "LoginWithPassword" | "newPassword" | "EnterCodeFromEmail" | "newUser"
    >("LoginWithPassword");
    const [errorMessage, setErrorMessage] = useState("");
    const [codeFromEmail, setCodeFromEmail] = useState("");
    const [userEmail, setUserFromEmail] = useState("");
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const closeModal = useModalStore((state) => state.closeModal);
    const openModal = useModalStore((state) => state.openModal);

    const handleForgetPassword = async (email: string) => {
        try {
            const result = await forgetPassword(email);
            setUserFromEmail(email);
            console.log(result);
            setErrorMessage("");
            setCurrentStep("EnterCodeFromEmail");
        } catch (error) {
            setErrorMessage("Failed to send the code.");
            console.error(error);
        }
    };

    return (
        <>
            {/* כפתור לפתיחת המודל */}
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                onClick={() => openModal()}
            >
                Open Login
            </button>

            {/* מודל */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md overflow-auto relative">
                        {/* כפתור לסגירת המודל */}
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => closeModal()}
                        >
                            ✖
                        </button>

                        {/* תוכן הלוגין */}
                        {currentStep === "LoginWithPassword" && (
                            <LoginWithPassword
                                onForgetPassword={handleForgetPassword}
                                onNewUser={() => {
                                    setErrorMessage("");
                                    setCurrentStep("newUser");
                                }}
                            />
                        )}
                        {currentStep === "EnterCodeFromEmail" && (
                            <EnterCodeFromEmail
                                onBack={(
                                    currentStep: "LoginWithPassword" | "newPassword",
                                    myCodeFromEmail: string
                                ) => {
                                    setCodeFromEmail(myCodeFromEmail);
                                    setErrorMessage("");
                                    setCurrentStep(currentStep);
                                }}
                            />
                        )}
                        {currentStep === "newPassword" && (
                            <ResetPassword otp={codeFromEmail} email={userEmail} />
                        )}
                        {currentStep === "newUser" && (
                            <Register
                                onBack={() => {
                                    setErrorMessage("");
                                    setCurrentStep("LoginWithPassword");
                                }}
                            />
                        )}
                        {errorMessage && (
                            <p className="text-red-500 text-center mt-4">{errorMessage}</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;

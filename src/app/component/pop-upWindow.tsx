"use client";

import React, { useEffect } from "react";
import useModalStore from "@/app/store/modelStore";
import "@/app/globals.css";

const PopUpWindow = ({ children }: { children: React.ReactNode }) => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  return (
    <div className="modal-bg">
      <div className="popup-content">
        <button onClick={() => {
          closeModal()

          console.log(isModalOpen);
        }}>✕</button>
        {children}
      </div>
    </div>
  );
};

export default PopUpWindow;

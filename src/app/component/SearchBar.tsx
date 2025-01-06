"use client";
import React, { useState } from "react";
import { EventCategory } from "@/app/types/post";
import { SearchBarProps } from "../types/user";
import Select from "react-select";  

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [userName, setUserName] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState<EventCategory | "">("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);  

  const handleSearch = () => {
    onSearch(userName, eventTitle, eventType as EventCategory, startDate, endDate, description);
  };

  const toggleForm = () => {
    setIsOpen((prev) => !prev); 
  };

  const eventCategoryOptions = Object.values(EventCategory).map((type) => ({
    value: type,
    label: type,
  }));

  return (
    <div className="p-4 bg-[#FFF7F7] rounded-lg shadow-md w-full max-w-md mx-auto space-y-4">
   
      <button
        onClick={toggleForm}
        className="flex items-center justify-between w-full text-[#1230AE] font-semibold text-lg focus:outline-none"
      >
        <span>סינון חיפוש</span>
        <span
          className={`ml-2 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        >
          ▼
        </span>
      </button>
      {isOpen && (
        <>
          <div>
            <label className="block text-[#1230AE] font-medium">שם משתמש:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="חפש לפי שם משתמש"
              className="mt-1 block w-full px-3 py-2 border border-[#6C48C5] rounded-md shadow-sm focus:ring-[#C68FE6] focus:border-[#C68FE6]"
            />
          </div>

          <div>
            <label className="block text-[#1230AE] font-medium">שם אירוע:</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="חפש לפי שם אירוע"
              className="mt-1 block w-full px-3 py-2 border border-[#6C48C5] rounded-md shadow-sm focus:ring-[#C68FE6] focus:border-[#C68FE6]"
            />
          </div>

          <div>
            <label className="block text-[#1230AE] font-medium">סוג אירוע:</label>
            <Select
              options={eventCategoryOptions}
              value={eventType ? { value: eventType, label: eventType } : null}
              onChange={(selectedOption) => setEventType(selectedOption ? selectedOption.value : "")}
              className="mt-1"
              placeholder="בחר סוג אירוע"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#6C48C5",
                  boxShadow: "none",
                  "&:hover": { borderColor: "#C68FE6" },
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#6C48C5",
                }),
              }}
            />
          </div>

          <div>
            <label className="block text-[#1230AE] font-medium">תאריך התחלה:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#6C48C5] rounded-md shadow-sm focus:ring-[#C68FE6] focus:border-[#C68FE6]"
            />
          </div>

          <div>
            <label className="block text-[#1230AE] font-medium">תאריך סיום:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-[#6C48C5] rounded-md shadow-sm focus:ring-[#C68FE6] focus:border-[#C68FE6]"
            />
          </div>

          <div>
            <label className="block text-[#1230AE] font-medium">תיאור:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="חפש לפי תיאור"
              className="mt-1 block w-full px-3 py-2 border border-[#6C48C5] rounded-md shadow-sm focus:ring-[#C68FE6] focus:border-[#C68FE6]"
            />
          </div>

          <div>
            <button
              onClick={handleSearch}
              className="w-full py-2 px-4 bg-[#6C48C5] text-white rounded-md focus:ring-[#C68FE6] hover:bg-[#C68FE6]"
            >
              חפש
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;

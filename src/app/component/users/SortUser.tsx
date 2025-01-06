
import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import { Language, Option, Title } from "@/app/types/user";

export interface SortFilterProps {
    onFilterChange: (filters: { language?: string[]; title?: string[]; city?: string[]; userName?: string }) => void;
    setFilteredUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

const SortFilter: React.FC<SortFilterProps> = ({ onFilterChange, setFilteredUsers }) => {
    const [selectedLanguages, setSelectedLanguages] = useState<MultiValue<Option>>([]);
    const [selectedTitles, setSelectedTitles] = useState<MultiValue<Option>>([]);
    const [userName, setUserName] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    const languageOptions: Option[] = Object.values(Language).map((value) => ({
        value: value as string,
        label: value as string,
    }));

    const titleOptions: Option[] = Object.values(Title).map((value) => ({
        value: value as string,
        label: value as string,
    }));

    const handleLanguageChange = (selectedOptions: MultiValue<Option>) => {
        setSelectedLanguages(selectedOptions);
        const languages = selectedOptions.map((option) => option.value);
        onFilterChange({ language: languages, title: undefined, city: undefined, userName });
    };

    const handleTitleChange = (selectedOptions: MultiValue<Option>) => {
        setSelectedTitles(selectedOptions);
        const titles = selectedOptions.map((option) => option.value);
        onFilterChange({ language: undefined, title: titles, city: undefined, userName });
    };

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserName(value);
        onFilterChange({ userName: value, language: undefined, title: undefined, city: undefined });
    };

    const toggleFilter = () => setIsOpen(!isOpen);

    return (
        <div className="p-4 bg-[#FFF7F7] rounded-lg shadow-md w-full max-w-md mx-auto">
            {/* כפתור לפתיחה/סגירה */}
            <button
                onClick={toggleFilter}
                className="flex items-center justify-between w-full text-[#1230AE] font-semibold text-lg focus:outline-none"
            >
                <span>סינון חיפוש</span>
                <span
                    className={`ml-2 transform transition-transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                >
                    ▼
                </span>
            </button>

          
            {isOpen && (
                <div className="mt-4 space-y-4">
                    <label className="block">
                        <span className="block text-[#1230AE] font-medium">
                            שם משתמש:
                        </span>
                        <input
                            type="text"
                            placeholder="חפש לפי שם משתמש..."
                            value={userName}
                            onChange={handleUserNameChange}
                            className="mt-1 block w-full px-3 py-2 border border-[#6C48C5] rounded-md shadow-sm focus:ring-[#C68FE6] focus:border-[#C68FE6]"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-[#1230AE] font-medium">
                            שפה:
                        </span>
                        <Select
                            options={languageOptions}
                            isMulti
                            placeholder="בחר שפות..."
                            value={selectedLanguages}
                            onChange={handleLanguageChange}
                            className="mt-1"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: "#6C48C5",
                                    boxShadow: "none",
                                    "&:hover": { borderColor: "#C68FE6" },
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: "#C68FE6",
                                    color: "#FFF7F7",
                                }),
                                multiValueLabel: (base) => ({
                                    ...base,
                                    color: "#FFF7F7",
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: "#6C48C5",
                                }),
                            }}
                        />
                    </label>

                    <label className="block">
                        <span className="block text-[#1230AE] font-medium">
                            תפקיד:
                        </span>
                        <Select
                            options={titleOptions}
                            isMulti
                            placeholder="בחר תפקידים..."
                            value={selectedTitles}
                            onChange={handleTitleChange}
                            className="mt-1"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: "#6C48C5",
                                    boxShadow: "none",
                                    "&:hover": { borderColor: "#C68FE6" },
                                }),
                                multiValue: (base) => ({
                                    ...base,
                                    backgroundColor: "#C68FE6",
                                    color: "#FFF7F7",
                                }),
                                multiValueLabel: (base) => ({
                                    ...base,
                                    color: "#FFF7F7",
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: "#6C48C5",
                                }),
                            }}
                        />
                    </label>
                </div>
            )}
        </div>
    );
};

export default SortFilter;

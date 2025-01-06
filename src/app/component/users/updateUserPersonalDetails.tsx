'use client';

import React, { useState } from 'react';
import { UserFormData, Title, Language, UpdateUserPersonalDetailsProps } from '@/app/types/user';
import useUserStore from '@/app/store/userModel';

const UpdateUserPersonalDetails: React.FC<UpdateUserPersonalDetailsProps> = ({ user }) => {
  const setUser = useUserStore((state) => state.setUser);
  const [formData, setFormData] = useState<UserFormData>({
    ...user,
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    userName: user?.userName || '',
    email: user?.email || '',
    password: user?.password || '',
    phone: user?.phone || '',
    description: user?.description || '',
    titles: user?.titles || [],
    languages: user?.languages || [],
    profileImage: user?.profileImage || null,
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      building: user?.address?.building || 0,
      zipCode: user?.address?.zipCode || '',
    },
    supplierDetails: user?.supplierDetails,
  });
  const [newTitle, setNewTitle] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
          [child]: child === 'building' ? Number(value) : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTitleAdd = () => {
    if (newTitle && Object.values(Title).includes(newTitle as Title)) {
      setFormData((prev) => ({
        ...prev,
        titles: [...prev.titles, newTitle as Title],
      }));
      setNewTitle('');
    }
  };

  const handleLanguageAdd = () => {
    if (newLanguage && Object.values(Language).includes(newLanguage as Language)) {
      setFormData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage as Language],
      }));
      setNewLanguage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/put', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('הפרופיל עודכן בהצלחה!');
        setUser(data.user);
      } else {
        setMessage(data.error || 'עדכון הפרופיל נכשל');
      }
    } catch (error) {
      setMessage('אירעה שגיאה בעת עדכון הפרופיל');
    }
  }

  if (!user) return <div>טוען...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-[#1230AE] mb-6">עדכון פרטים אישיים</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* פרטים בסיסיים */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#1230AE]">שם פרטי</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:ring-[#6C48C5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1230AE]">שם משפחה</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:ring-[#6C48C5]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1230AE]">טלפון</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1230AE]">תיאור</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>

        {/* שדות כתובת */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#1230AE]">עיר</label>
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1230AE]">רחוב</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">הוספת תואר</label>
            <div className="flex items-center gap-3">
              <select
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 border-[#1230AE] bg-[#FFF7F7] text-[#1230AE] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6C48C5] hover:bg-[#C68FE6] transition-colors"
              >
                <option value="">בחר תואר</option>
                {Object.values(Title).map((title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleTitleAdd}
                className="bg-[#6C48C5] text-white px-4 py-2 rounded-lg hover:bg-[#1230AE]  transition-colors"
              >
                הוסף
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">תארים נוכחיים:</span> {formData.titles.join(', ')}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">הוספת שפה</label>
            <div className="flex items-center gap-3">
              <select
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                className="flex-1 border-[#1230AE] bg-[#FFF7F7] text-[#1230AE] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6C48C5] hover:bg-[#C68FE6] transition-colors"
              >
                <option value="">בחר שפה</option>
                {Object.values(Language).map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>


              <button
                type="button"
                onClick={handleLanguageAdd}
                className="bg-[#6C48C5] text-white px-4 py-2 rounded-lg hover:bg-[#1230AE]  transition-colors"
              >
                הוסף
              </button>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">שפות נוכחיות:</span> {formData.languages.join(', ')}
            </div>
          </div>
        </div>

        {/* הודעה */}
        {message && (
          <div
            className={`p-4 rounded-lg ${message.includes('בהצלחה')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
              }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#6C48C5] text-[#FFF7F7] px-4 py-3 rounded-lg hover:bg-[#1230AE] transition-colors"
        >
          עדכון פרופיל
        </button>
      </form>
    </div>
  );
};

export default UpdateUserPersonalDetails;

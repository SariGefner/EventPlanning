import React from 'react';

const UserCard: React.FC<{ user: any }> = ({ user }) => {
  const defaultProfileImage = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-16 h-16 text-[#6C48C5]"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M12 14c-4 0-6 2-6 6" />
    </svg>
  );

  return (
    <div className="user-card bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto mb-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="header mb-6 flex items-center">

        <div className="w-16 h-16 rounded-full overflow-hidden mr-6 flex items-center justify-center bg-[#C68FE6]">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.userName}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            defaultProfileImage 
          )}
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-[#1230AE] hover:text-[#6C48C5] transition-colors duration-300">
            <a href={`/pages/users/${user.userName}`}>
              {user.userName}
            </a>
          </h2>
          <p className="text-[#6C48C5] font-medium">{user.email}</p>
        </div>
      </div>

      <div className="details space-y-4 text-[#1230AE]">
        <div className="flex justify-between items-center">
          <strong>מספר טלפון:</strong>
          <span>{user.phone}</span>
        </div>
        {user?.addressId?.city && (
          <div className="flex justify-between items-center">
            <strong>עיר:</strong>
            <span>{user?.addressId?.city}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <strong>תפקידים:</strong>
          <span>{user.titles.join(', ')}</span>
        </div>
        <div className="flex justify-between items-center">
          <strong>שפות:</strong>
          <span>{user.languages.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

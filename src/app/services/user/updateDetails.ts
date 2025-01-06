import { User } from '@/app/types/user';
import { getBaseUrl  } from '@/app/services/config/axios';
import useUserStore from '@/app/store/userModel';
import axios from 'axios';

const baseUrl = getBaseUrl();

export const updateUserDetails = async (userData: Partial<User>): Promise<{ user: User; message: string }> => {
  try {
    const response = await fetch(`${baseUrl}/api/users/put`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user details');
    }

    const data = await response.json();
    return {
      user: data.user,
      message: data.message
    };
  } catch (error) {
    throw error;
  }
};
export const addUserToFavorites = async (favoriteUserName: string) => {
  try {
    const data = { "favoriteUserName": favoriteUserName };

    const response = await axios.put(
      `${baseUrl}/api/users/favorites`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("User added to favorites successfully:", response.data);

    const setLikedPeopleArr = useUserStore.getState().setLikedPeople;
    const likedUser = response.data; // נניח שהתגובה מהשרת מכילה את המידע החדש
    setLikedPeopleArr(likedUser);

    return response;
  } catch (error) {
    console.error("Error adding user to favorites:", error);
    throw error;
  }
};

export const removePostFromFavorites = async (favoritePostID: string) => {
  try {
    const data = { "favoritePostID": favoritePostID };

    const response = await axios.put(
      `${baseUrl}/api/users/favorites/delete`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Post deleted from favorites successfully:", response.data);

    const setLikedPostsArr = useUserStore.getState().setLikedPostsArr;
    const updatedLikedPostsArr = useUserStore.getState().likedPostsArr.filter(
      (post: any) => post._id !== favoritePostID
    );
    setLikedPostsArr(updatedLikedPostsArr);

    return response;
  } catch (error) {
    console.error("Error removing post from favorites:", error);
    throw error;
  }
};

export const removeUserFromFavorites = async (favoriteUserName: string) => {
  try {
    const data = { "favoriteUserName": favoriteUserName };

    const response = await axios.put(
      `${baseUrl}/api/users/favorites/delete`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("User deleted from favorites successfully:", response.data);

    const setLikedPeopleArr = useUserStore.getState().setLikedPeople;
    const updatedLikedPeopleArr = useUserStore.getState().likedPeople.filter(
      (user: any) => user.userName !== favoriteUserName
    );
    setLikedPeopleArr(updatedLikedPeopleArr);

    return response;
  } catch (error) {
    console.error("Error removing user from favorites:", error);
    throw error;
  }
};
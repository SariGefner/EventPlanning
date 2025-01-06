import useUserStore from "@/app/store/userModel";
import axios from "axios";
import { getSession } from "next-auth/react";
import { getBaseUrl } from '@/app/services/config/axios'


const baseUrl = getBaseUrl();

export const getUserByUsername = async (username: string) => {
  try {

    const response = await axios.get(`${baseUrl}/api/users/get/username?username=${username}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error; // טיפול בשגיאות
  }
};

export const getMyDetails = async () => {
  try {
    
    const session = await getSession();

    if (session?.user?.email) {
      try {
        const response = await axios.get(`${baseUrl}/api/users/get/username?email=${session.user.email}`, {
  
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (emailError) {
        console.warn('Error fetching by email:', emailError);
      }
    }


    if (typeof window !== 'undefined') {
      const cookies = document.cookie.split('; ');
      const usernameCookie = cookies.find(row => row.startsWith('userName='));
      if (usernameCookie) {
        const myUserName = decodeURIComponent(usernameCookie.split('=')[1]);
        console.log('Username from cookie:', myUserName);
        const response = await axios.get(`${baseUrl}/api/users/get/username?username=${myUserName}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);

        return response.data;
      }
    }

    // If no authentication method found
    throw new Error('No authenticated user found');
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const getUserDetails = async (userName: string) => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/get/username?username=${userName}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const setUser = useUserStore.getState().setUser;
    const user = response.data.user;
    setUser(user);
    console.log('User :', response.data.user);
    return response.data
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; 
  }
};
;

export const getAllUsers = async (
    page: number = 1,
    limit: number = 10,
    filters: {
      title?: string[];
      language?: string[];
      city?: string[];
      userName?: string;
    } = {}
  ) => {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters.title && { title: filters.title.join(',') }),
        ...(filters.language && { language: filters.language.join(',') }),
        ...(filters.city && { city: filters.city.join(',') }),
        ...(filters.userName && { userName: filters.userName }), // הוספת חיפוש לפי שם משתמש
      }).toString();
  
      const response = await axios.get(`${baseUrl}/api/users/get/?${queryParams}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('users:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  
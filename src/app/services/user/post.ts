import useUserStore from "@/app/store/userModel";
import axios from "axios";
import { getBaseUrl } from "../config/axios";

const baseUrl = getBaseUrl();

export const addPostToUser = async (post: object) => {
  try {
  
    const username = decodeURIComponent(document.cookie.split("=")[1]);
    const response = await axios.post(
      `${baseUrl}/api/posts/post/username?username=${username}`,
      post,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Post added successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};


export const getUserPosts = async () => {
  try {

    const username = decodeURIComponent(document.cookie.split("=")[1]);

    const response = await axios.get(
      `${baseUrl}/api/users/get/username?username=${username}`
    );

    console.log("User fetched successfully:", response.data);

   
    return response.data.postArr;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error; 
  }
};

export const addPostToFavorites = async (favoritePostID: string) => {
  try {
   
    const data = { "favoritePostID": favoritePostID };

   
    const response = await axios.put(

      `${baseUrl}/api/users/favorites`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Post added to favorites successfully:", response.data);

    const setLikedPostsArr = useUserStore.getState().setLikedPostsArr;
    const likedPost = response.data; 
    setLikedPostsArr(likedPost);

    return response;
  } catch (error) {
    console.error("Error adding post to favorites:", error);
    throw error;
  }
};


export const removePostToFavorites = async (favoritePostID: string) => {
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
    setLikedPostsArr(updatedLikedPostsArr)

    return response;
  } catch (error) {
    console.error("Error adding post to favorites:", error);
    throw error; 
  }
};
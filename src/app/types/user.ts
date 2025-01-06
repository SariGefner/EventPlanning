import { ObjectId } from "mongoose";
import { UploadApiResponse } from "cloudinary";
import exp from "constants";
import { NextRequest } from "next/server";
import { EventCategory, Post, Recommendation } from "./post";

export interface SupplierDetails {
  startingPrice: number;
  topPrice: number;
}
export enum Title {
  Supplier = 'ספק/ית',
  MakeupArtist = 'מאפר/ת',
  Photographer = 'צלם/ת',
  SoundEngineer = 'סאונדמן/ית',
  EventDesigner = 'מעצב/ת אירועים',
  Singer = 'זמר/ת',

  // תוסיפי עוד טייטלים לפי הצורך
}
export type Option = {
  value: string;
  label: string;
};

export type Img = {
  imgUrl: string;
}

// export enum Language {
//   Hebrew = 'Hebrew',
//   English = 'English',
//   French = 'French',
//   Yiddish = 'Yiddish',
//   Spanish = 'Spanish',
//   Russian = 'Russian',
//   // תוסיפי עוד שפות לפי הצורך
// }
export enum Language {
  Hebrew = 'עברית',
  English = 'English',
  French = 'Français',
  Yiddish = 'יידיש',
  Spanish = 'Español',
  Russian = 'русский',
  // תוסיפי עוד שפות לפי הצורך
}
// export enum Language {
//   Hebrew = 'עברית',
//   English = 'English',
//   French = 'Français',
//   Yiddish = 'יידיש',
//   Spanish = 'Español',
//   Russian = 'русский',
//   // תוסיפי עוד שפות לפי הצורך
// }


export interface PostCardProps {
  _id: string,
  recommendations: Recommendation[];
  album: string[];
  createDate: Date;
  title: string;
  description: string;
  userName: string,
  userDetails: { titles: string[] },
  postId: {
    budget: number,
    eventCategory: EventCategory,
    supplierNameArr: string[]
  };
}

export interface User {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  userName: string; // unique
  email: string; // unique
  titles: (Title | "consumer")[]; // מערך של טיטלים
  phone: string;
  languages: [Language]; // מערך של שפות
  addressId: ObjectId; // reference to Address
  description: string;
  postArr: ObjectId[];
  likedPostsArr: ObjectId[]; // array of Post ObjectIds
  likedPeople: string[];
  profileImage: Img; // מערך של פוסטים
}

export interface Auth {
  userName: string;
  email: string;
  password: string;
  otp: String;
  otpExpiration: Date;
}
export interface Supplier {
  userName: string;
  startingPrice: number;
  topPrice: number;
  range: number; // maximum distance they will serve
}

export interface Address {
  userName: string;
  zipCode: string;
  city: string;
  street: string;
  building: number;
}

export interface UserFormData {
  // roles: never[];
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  titles: (Title | "consumer")[]; //string[];
  phone: string;
  description: string;
  languages: Language[];
  address: {
    zipCode: string;
    city: string;
    street: string;
    building: number;
  };
  supplierDetails?: SupplierDetails;
  profileImage: string | null;
}
export interface UserResponseData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  titles: (Title | "consumer" | null)[]; // אם `titles` יכול להיות `null`
  phone: string;
  description: string;
  languages: Language[];
  addressId: {
    zipCode: string;
    city: string;
    street: string;
    building: number;
  };
  profileImage: string | null;
  likedPeople: string[];
  likedPostsArr: Post[];
  postArr: Post[];
}
export interface SearchBarProps {
  onSearch: (
    userName: string,
    eventTitle: string,
    eventType: EventCategory,
    startDate: string,
    endDate: string,
    description: string,
    // userTitle: Title
  ) => void;
}


export interface UserResponseData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  titles: (Title | "consumer" | null)[]; // אם `titles` יכול להיות `null`
  phone: string;
  description: string;
  languages: Language[];
  addressId: {
    zipCode: string;
    city: string;
    street: string;
    building: number;
  };
  profileImage: string | null;
  likedPeople: string[];
  likedPostsArr: Post[];
  postArr: Post[];
}
export interface UserStore {
  user: UserFormData | null,
  likedPostsArr: Post[],
  likedPeople: string[],
  postArr: Post[],
  setUser: (newUser: UserFormData) => void;
  setLikedPostsArr: (newPost: Post | Post[]) => void;
  setLikedPeople: (newPeople: string | string[]) => void;
  setPostArr: (newPost: Post | Post[]) => void;
  isReady: boolean;
  setReady: (ready: boolean) => void;
  clearUser: () => void;
}



export interface CustomRequest extends NextRequest {
  userName?: string;
}


export interface ModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export interface ShowUserPersonalDetailsProps {
  user: UserFormData;
}

export interface ModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}



export interface UpdateUserPersonalDetailsProps {
  user: UserFormData;
}
export interface MessageChat{
  username:string;
  text:string;
  otheruser:string;
  timestamp:Date;
}
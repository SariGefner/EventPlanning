"use client";
import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import "@/app/css/posts/AddPost.css";
import { addingMyPost } from "@/app/services/post/post";
import useModalStore from "@/app/store/modelStore";
import useUserStore from "@/app/store/userModel";
import '@/app/globals.css';
import { getAllUsers } from "@/app/services/user/getDetails";
import { CldUploadWidget } from 'next-cloudinary';
import TermsPage from "../terms";
import Swal from "sweetalert2";



const AddPost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [eventCategory, setEventCategory] = useState<string>("barmitzva");
  const [album, setAlbum] = useState<string[]>([]);
  const [budget, setBudget] = useState<number>(0);
  const [isConsumer, setIsConsumer] = useState<boolean>(true);
  const [supplierNameArr, setSupplierNameArr] = useState<MultiValue<string>>([]);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<{ value: string; label: string }[]>([]);
  const [showModal, setShowModal] = useState(false);

  const closeModal = useModalStore((state) => state.closeModal);
  const setPostArr = useUserStore((state) => state.setPostArr);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getAllUsers();

        const filteredSuppliers = data.users
          .filter((user: any) => user.titles.includes('consumer') && user.titles.length > 1)
          .map((user: any) => user.userName);
        console.log("filteredSuppliers", filteredSuppliers);

        const supplierOptions = filteredSuppliers.map((user: string) => ({
          value: user,
          label: user,
        }));
        console.log("supplierOptions", supplierOptions);

        setSuppliers(supplierOptions);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchSuppliers();
  }, []);


  const handleUploadSuccess = async (result: any) => {
    if (result.info && result.info.secure_url) {
      const secureUrl = result.info.secure_url;
      setAlbum((prev) => [...prev, secureUrl]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const fileReaders = files.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(file);
        return new Promise<string>((resolve) => {
          console.log(reader.onload = () => resolve(reader.result as string));

          reader.onload = () => resolve(reader.result as string);

        });
      });

      Promise.all(fileReaders).then((uploadedImages) => {
        setAlbum((prev) => [...prev, ...uploadedImages]);
        console.log(album);

      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      Swal.fire({
        title: 'שגיאה',
        text: 'יש לאשר את התנאים לפני המשך',
        icon: 'warning',
        confirmButtonText: 'אישור',
        customClass: {
          popup: 'swal2-rtl'
        }
      });
      return;
    }

    const newPost = {
      title,
      description,
      album,
      eventCategory,
      budget,
      supplierNameArr,
      isConsumer,
    };

    console.log("Post Created: ", newPost);
    const pp = await addingMyPost(newPost)
    closeModal()
    setPostArr(pp.post)
    Swal.fire({
      title: 'בוצע בהצלחה!',
      text: 'הפוסט נוסף בהצלחה!',
      icon: 'success',
      confirmButtonText: 'אישור',
      customClass: {
        popup: 'swal2-rtl'
      },
      showConfirmButton: true,
      timer: 3000, 
      timerProgressBar: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
    setTitle("");
    setDescription("");
    setEventCategory("barmitzva");
    setSupplierNameArr([])
    setAlbum([]);
    setBudget(0);
    setAcceptedTerms(false);
  };

  return (
    <form className="add-post" onSubmit={handleSubmit}>
      <h2>הוספת פוסט חדש</h2>
      <p>את מוזמנת לשתף את האירוע החדש שלך !!</p>

      <label>
        כותרת:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        סוג אירוע:
        <select
          value={eventCategory}
          onChange={(e) => setEventCategory(e.target.value)}
          required
        >
          <option value="barmitzva">בר מצווה</option>
          <option value="wedding">חתונה</option>
          <option value="bat mitzva">בת מצווה</option>
          <option value="engagement">אירוסין</option>
          <option value="birthday">יום הולדת</option>
          <option value="family party">מסיבת משפחה</option>
          <option value="other">אחר</option>
        </select>
      </label>

      <label>
        הספקים שלי:
        <Select
          options={suppliers}
          isMulti
          placeholder="בחר ספקים..."
          onChange={(selectedOptions) => setSupplierNameArr(selectedOptions.map((option) => option.value))}
          value={supplierNameArr.map((supplier) => ({ value: supplier, label: supplier }))}
        />
      </label>
      <label>
        תיאור האירוע:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <label>
        תקציב האירוע:
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          required
        />
      </label>

      <label>העלאת תמונות
        <CldUploadWidget
          uploadPreset="appOrganizerEvent"
          onSuccess={handleUploadSuccess}
          options={{
            sources: [
              'local',
              'camera',
              'google_drive',
              'url'
            ],
            maxFiles: 35,
          }}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Upload an Image
            </button>
          )}
        </CldUploadWidget>
      </label>
      <label className="flex items-center space-x-2 rtl:space-x-reverse">
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => setShowModal(true)}
        >
          אני מאשרת את התנאים
        </span>
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={() => setAcceptedTerms(!acceptedTerms)}
          required
        />
      </label>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden">
          <div className="bg-white p-6 rounded shadow-lg w-4/5 max-w-2xl overflow-y-auto">
            <TermsPage />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              סגור
            </button>
          </div>
        </div>
      )}
      <button type="submit" className="button-primary">הוספת פוסט</button>
    </form>
  );
};

export default AddPost;

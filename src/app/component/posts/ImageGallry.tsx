import { addImageToPost } from '@/app/services/post/post';
import { CldUploadWidget } from 'next-cloudinary';
import React, { useState, useEffect } from 'react';

interface ImageGalleryProps {
  postUsername: string;
  postId: string;
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, postId, postUsername }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const userNameFromCookie = decodeURIComponent(document.cookie);
    const userNameCookie = userNameFromCookie.split('; ').find(cookie => cookie.startsWith('userName='));
    if (userNameCookie) {
      setUserName(userNameCookie.split('=')[1]);
    } else {
      console.error('userName cookie not found');
    }
  }, []);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleUploadSuccess = async (result: any) => {
    if (result.info && result.info.secure_url) {
      const secureUrl = result.info.secure_url;
      await addImageToPost(postId, secureUrl); 
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); 
  };

  const displayedImages = isExpanded ? images : images.slice(0, 2);

  return (
    <div className="image-gallery mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">תמונות:</h2>
      <div className="flex gap-6 flex-wrap justify-start">
        {displayedImages.map((image, index) => (
          <div
            key={index}
            className="w-28 h-28 bg-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={() => openModal(index)}
          >
            <img
              src={image}
              alt={`image-${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 2 && (
        <button
          onClick={toggleExpand}
          className="mt-4 text-blue-600 font-semibold"
        >
          {isExpanded ? 'הסתר' : 'הצג עוד'}
        </button>
      )}

      {postUsername === userName && (
        <CldUploadWidget
          uploadPreset="appOrganizerEvent"
          onSuccess={handleUploadSuccess}
          options={{
            sources: ['local', 'camera', 'google_drive', 'url'],
            maxFiles: 35,
          }}
        >
          {({ open }) => (
            <button
              onClick={() => open()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              +
            </button>
          )}
        </CldUploadWidget>
      )}

   
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg max-w-4xl shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-black p-3 rounded-full"
            >
              X
            </button>

            <div className="flex justify-between items-center">
              <button
                onClick={prevImage}
                className="text-white bg-black p-3 rounded-full"
              >
                ←
              </button>

              <img
                src={images[selectedImageIndex]}
                alt="Selected"
                className="max-w-full max-h-96 object-contain rounded-md shadow-lg"
              />

              <button
                onClick={nextImage}
                className="text-white bg-black p-3 rounded-full"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

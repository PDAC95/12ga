import { useState } from 'react';

export const useImageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('image-modal-overlay')) {
      closeModal();
    }
  };

  return {
    isModalOpen,
    selectedImage,
    openModal,
    closeModal,
    handleModalClick,
  };
};
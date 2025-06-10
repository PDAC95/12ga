import { useState } from 'react';

export const useTruckSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openSidebar = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsSidebarOpen(true);
    
    // Add smooth body scroll lock
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '0px';
    
    // Slower, more elegant opening animation
    const sidebarElement = document.querySelector('.sidebar');
    const overlayElement = document.querySelector('.sidebar-overlay');
    
    if (sidebarElement) {
      sidebarElement.style.transition = 'right 1.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    }
    
    if (overlayElement) {
      overlayElement.style.transition = 'opacity 1.2s ease';
    }
    
    // Reset animation state after slower opening completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1800);
  };

  const closeSidebar = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Fast, snappy closing animation (keep as is)
    const sidebarElement = document.querySelector('.sidebar');
    const overlayElement = document.querySelector('.sidebar-overlay');
    
    if (sidebarElement) {
      sidebarElement.style.transition = 'right 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
      sidebarElement.style.right = '-500px';
    }
    
    if (overlayElement) {
      overlayElement.style.transition = 'opacity 0.6s ease';
      overlayElement.style.opacity = '0';
    }
    
    // Restore scroll and cleanup
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      document.body.style.transition = 'none';
      setIsSidebarOpen(false);
      setIsAnimating(false);
    }, 800);
  };

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      closeSidebar();
    } else {
      openSidebar();
    }
  };

  return {
    isSidebarOpen,
    isAnimating,
    openSidebar,
    closeSidebar,
    toggleSidebar
  };
};
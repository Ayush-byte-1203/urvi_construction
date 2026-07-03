import React, { createContext, useState, useContext, useCallback } from 'react';
import { X } from 'lucide-react';

const ModalContext = createContext({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {}
});

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setModalContent(null);
    document.body.style.overflow = 'unset';
  }, []);

  const openModal = useCallback((content) => {
    setModalContent(content);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {/* Global Modal Overlay Panel */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(13, 14, 18, 0.85)',
            backdropFilter: 'blur(8px)',
            webkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200, // Matching THEME.zIndex.modal
            padding: '1.5rem',
            animation: 'fadeIn var(--transition-fast) forwards'
          }}
          onClick={closeModal}
        >
          <div 
            className="glass-panel"
            style={{
              maxWidth: '650px',
              width: '100%',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              position: 'relative',
              boxShadow: 'var(--shadow-lg)',
              padding: '2.5rem',
              animation: 'slideUp var(--transition-normal) forwards'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing on clicking inside the modal
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'color var(--transition-fast)'
              }}
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            {/* Modal Body */}
            <div>{modalContent}</div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
export default ModalContext;

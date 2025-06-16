import { useState, useEffect } from 'react';

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Control body scroll based on modal state
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        // Cleanup function to ensure body scroll is restored
        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return {
        isOpen,
        openModal,
        closeModal
    };
};
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/modal.css'; 
import { IoCloseCircleOutline } from "react-icons/io5";

function BaseModal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className="modal-overlay" onClick={onClose}></div>
            <div className="modal-content">
                <button className="modal-close-button" onClick={onClose}>
                    <IoCloseCircleOutline />
                </button>
                {children}
            </div>
        </>,
        document.getElementById('modal-root')
    );
}

export default BaseModal;
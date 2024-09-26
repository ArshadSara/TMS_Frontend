import React from 'react';
import Modal from 'react-modal';
import './ConfirmationModal.css'; 

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} className="modal">
            <h2>Confirmation</h2>
            <p>{message}</p>
            <div className="modal-actions">
                <button onClick={onConfirm} className="confirm-button">Yes</button>
                <button onClick={onRequestClose} className="cancel-button">No</button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;

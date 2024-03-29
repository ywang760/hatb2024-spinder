// ModalComponent.tsx
import React from "react";
import Modal from "@mui/material/Modal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalComponent({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container text-primary-200 text-xl font-semibold">
        <h2>Congratulations!</h2>
        <p>You&#39;ve reached 100% relationship temperature.</p>
        <button onClick={onClose}>Continue Playing</button>
      </div>
    </div>
  );
}

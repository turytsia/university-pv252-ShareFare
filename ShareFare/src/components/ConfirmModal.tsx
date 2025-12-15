import { X, CheckCircle2 } from "lucide-react";
import "./ConfirmModal.css";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="confirm-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onCancel}>
          <X size={20} />
        </button>

        <div className="confirm-icon">
          <CheckCircle2 size={48} />
        </div>

        <h2 className="confirm-title">{title}</h2>
        <p className="confirm-message">{message}</p>

        <div className="confirm-actions">
          <button className="cancel-action-btn" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="confirm-action-btn" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

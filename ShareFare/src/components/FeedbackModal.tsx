import { useState } from "react";
import { X, Star } from "lucide-react";
import "./FeedbackModal.css";

interface FeedbackModalProps {
  otherUserName: string;
  itemTitle: string;
  onSubmit: (feedback: {
    responseTime: number;
    packagingQuality: number;
    contentsQuality: number;
    comment: string;
  }) => void;
  onClose: () => void;
}

const StarRating = ({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) => (
  <div className="rating-item">
    <label>{label}</label>
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-btn ${value >= star ? "active" : ""}`}
          onClick={() => onChange(star)}
        >
          <Star size={24} fill={value >= star ? "currentColor" : "none"} />
        </button>
      ))}
    </div>
  </div>
);

export default function FeedbackModal({
  otherUserName,
  itemTitle,
  onSubmit,
  onClose,
}: FeedbackModalProps) {
  const [responseTime, setResponseTime] = useState(0);
  const [packagingQuality, setPackagingQuality] = useState(0);
  const [contentsQuality, setContentsQuality] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (responseTime && packagingQuality && contentsQuality) {
      onSubmit({
        responseTime,
        packagingQuality,
        contentsQuality,
        comment,
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="feedback-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="feedback-modal-header">
          <div>
            <h2>Leave Feedback</h2>
            <p>How was your experience with {otherUserName}?</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="feedback-item-info">
            <div className="feedback-icon">📦</div>
            <div>
              <div className="feedback-item-title">{itemTitle}</div>
              <div className="feedback-item-subtitle">Pickup completed</div>
            </div>
          </div>

          <div className="ratings-section">
            <StarRating
              label="Response Time"
              value={responseTime}
              onChange={setResponseTime}
            />
            <p className="rating-description">
              How quickly did they respond to your messages?
            </p>

            <StarRating
              label="Packaging Quality"
              value={packagingQuality}
              onChange={setPackagingQuality}
            />
            <p className="rating-description">
              Was the food properly packaged and sealed?
            </p>

            <StarRating
              label="Contents Quality"
              value={contentsQuality}
              onChange={setContentsQuality}
            />
            <p className="rating-description">
              Was the food as described and in good condition?
            </p>
          </div>

          <div className="comment-section">
            <label>Additional Comments (Optional)</label>
            <textarea
              placeholder="Share more about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>

          <div className="feedback-actions">
            <button type="button" className="skip-btn" onClick={onClose}>
              Skip for now
            </button>
            <button
              type="submit"
              className="submit-feedback-btn"
              disabled={!responseTime || !packagingQuality || !contentsQuality}
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

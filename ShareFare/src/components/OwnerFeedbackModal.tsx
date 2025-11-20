import { useState } from 'react';
import { X, Star } from 'lucide-react';
import './OwnerFeedbackModal.css';

interface OwnerFeedbackModalProps {
  claimerName: string;
  itemTitle: string;
  onSubmit: (feedback: {
    responseTime: number;
    comment: string;
  }) => void;
  onClose: () => void;
}

const StarRating = ({ 
  value, 
  onChange, 
  label 
}: { 
  value: number; 
  onChange: (v: number) => void; 
  label: string;
}) => (
  <div className="rating-group">
    <label className="rating-label">{label}</label>
    <div className="stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`star-btn ${value >= star ? 'active' : ''}`}
          onClick={() => onChange(star)}
        >
          <Star size={24} fill={value >= star ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  </div>
);

export default function OwnerFeedbackModal({
  claimerName,
  itemTitle,
  onSubmit,
  onClose,
}: OwnerFeedbackModalProps) {
  const [responseTime, setResponseTime] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (responseTime === 0) {
      alert('Please rate the response time');
      return;
    }
    onSubmit({ responseTime, comment });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Rate Your Experience</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <p className="feedback-intro">
            How was your experience with <strong>{claimerName}</strong> for <strong>{itemTitle}</strong>?
          </p>

          <form onSubmit={handleSubmit}>
            <StarRating
              label="Response Time"
              value={responseTime}
              onChange={setResponseTime}
            />

            <div className="form-group">
              <label className="rating-label">Additional Comments (Optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share any additional feedback about the pickup experience..."
                rows={4}
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

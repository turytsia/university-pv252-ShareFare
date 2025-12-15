import {
  X,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  MessageCircle,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FoodItem } from "../types";
import "./ItemDetailsModal.css";
import VerifiedBadge from "./VerifiedBadge";

interface ItemDetailsModalProps {
  item: FoodItem;
  onClose: () => void;
  onClaim: (itemId: string) => void;
  onContact: (userId: string, itemId?: string) => void;
}

export default function ItemDetailsModal({
  item,
  onClose,
  onClaim,
  onContact,
}: ItemDetailsModalProps) {
  const navigate = useNavigate();

  const handleContact = () => {
    onContact(item.listedBy.id, item.id);
    onClose();
    // Navigate to messages page with itemId to auto-open the chat
    navigate(`/messages?itemId=${item.id}`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="item-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn-fixed" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="item-modal-image">
          <img src={item.image} alt={item.title} />
          <div className="item-modal-badges">
            <span className="distance-badge">
              <MapPin size={14} />
              {item.distance} km away
            </span>
            <span className="status-badge available">available</span>
          </div>
        </div>

        <div className="item-modal-body">
          <h2 className="item-modal-title">{item.title}</h2>
          <p className="item-modal-quantity">{item.quantity}</p>

          <div className="food-card-tags">
            {item.dietaryTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="item-modal-section">
            <h3>Details</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <Calendar size={18} />
                <div>
                  <div className="detail-label">Best By</div>
                  <div className="detail-value">{item.bestBy}</div>
                </div>
              </div>
              <div className="detail-item">
                <Clock size={18} />
                <div>
                  <div className="detail-label">Pickup Window</div>
                  <div className="detail-value">{item.pickupWindow}</div>
                </div>
              </div>
              <div className="detail-item">
                <MapPin size={18} />
                <div>
                  <div className="detail-label">Location</div>
                  <div className="detail-value">{item.distance} km away</div>
                  <div className="detail-note">
                    Exact address will be shared after claiming
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="item-modal-section">
            <h3>Listed by</h3>
            <div className="user-card">
              <img src={item.listedBy.avatar} alt={item.listedBy.name} />
              <div className="user-card-info">
                <div className="user-card-name">
                  {item.listedBy.name}
                  {item.listedBy.verified && VerifiedBadge({ size: 16 })}
                </div>
                <div className="user-card-location">
                  {item.listedBy.location}
                </div>
                <div className="user-card-stats">
                  <span className="stat-item">
                    <span className="stat-icon ">
                      <Check size={20} />
                    </span>
                    {item.listedBy.completionRate}% completion
                  </span>
                  <span className="stat-item">
                    <span className="stat-icon">
                      <Clock size={20} />
                    </span>
                    Responds {item.listedBy.responseTime}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="remember-box">
            <span className="remember-icon">💡</span>
            <div>
              <strong>Remember:</strong>
              <p>
                Be respectful, show up on time, and communicate any changes
                promptly.
              </p>
            </div>
          </div>

          <div className="item-modal-actions">
            <button className="contact-btn" onClick={handleContact}>
              <MessageCircle size={20} />
              Contact
            </button>
            <button
              className="claim-btn-large"
              onClick={() => {
                onClaim(item.id);
                onClose();
              }}
            >
              Claim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

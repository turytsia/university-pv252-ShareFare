import { useMemo } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  User,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { FoodItem } from "../types";
import "./ViewItemPage.css";

interface ViewItemPageProps {
  items: FoodItem[];
  onClaim?: (itemId: string) => void;
  onContact?: (userId: string, itemId?: string) => void;
}

export default function ViewItemPage({
  items,
  onClaim,
  onContact,
}: ViewItemPageProps) {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId: string }>();

  const item = useMemo(() => {
    return itemId ? items.find((i) => i.id === itemId) || null : null;
  }, [itemId, items]);

  const handleClaim = () => {
    if (item && onClaim) {
      onClaim(item.id);
    }
  };

  const handleContact = () => {
    if (item && onContact) {
      onContact(item.listedBy.id, item.id);
      // Navigate to messages page with itemId to auto-open the chat
      navigate(`/messages?itemId=${item.id}`);
    }
  };

  if (!item) {
    return (
      <div className="view-item-page">
        <div className="view-item-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <h2>Item Not Found</h2>
        </div>
        <div className="view-item-content">
          <p>The item you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="view-item-page">
      <div className="view-item-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <h2>Item Details</h2>
        <span className={`status-badge ${item.status}`}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      </div>

      <div className="view-item-content">
        {/* Item Image */}
        <div className="item-image-section">
          <img src={item.image} alt={item.title} className="item-image" />
          {item.dietaryTags.length > 0 && (
            <div className="dietary-tags">
              {item.dietaryTags.map((tag) => (
                <span key={tag} className="dietary-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Basic Information */}
        <div className="info-section">
          <h3>Basic Information</h3>

          <div className="info-group">
            <label className="info-label">Item Title</label>
            <p className="info-value">{item.title}</p>
          </div>

          <div className="info-group">
            <label className="info-label">Category</label>
            <p className="info-value">
              <span className="category-badge">{item.category}</span>
            </p>
          </div>

          <div className="info-group">
            <label className="info-label">Quantity</label>
            <p className="info-value">{item.quantity}</p>
          </div>

          {item.description && (
            <div className="info-group">
              <label className="info-label">Description</label>
              <p className="info-value description">{item.description}</p>
            </div>
          )}
        </div>

        {/* Availability Information */}
        <div className="info-section">
          <h3>Availability</h3>

          <div className="info-row">
            <Calendar size={20} />
            <div>
              <label className="info-label">Best By</label>
              <p className="info-value">{item.bestBy}</p>
            </div>
          </div>

          <div className="info-row">
            <Clock size={20} />
            <div>
              <label className="info-label">Pickup Window</label>
              <p className="info-value">{item.pickupWindow}</p>
            </div>
          </div>

          <div className="info-row">
            <MapPin size={20} />
            <div>
              <label className="info-label">Location</label>
              <p className="info-value">{item.location}</p>
              {item.exactAddress && item.status === "claimed" && (
                <p className="info-subvalue">{item.exactAddress}</p>
              )}
            </div>
          </div>
        </div>

        {/* Listed By Information */}
        <div className="info-section">
          <h3>Listed By</h3>

          <div className="user-info">
            <img
              src={item.listedBy.avatar}
              alt={item.listedBy.name}
              className="user-avatar"
            />
            <div className="user-details">
              <div className="user-name-row">
                <h4>{item.listedBy.name}</h4>
                {item.listedBy.verified && (
                  <CheckCircle size={16} className="verified-icon" />
                )}
              </div>
              <p className="user-location">
                <MapPin size={14} />
                {item.listedBy.location}
              </p>
              <div className="user-stats">
                <span className="stat">
                  <User size={14} />
                  {item.listedBy.completionRate}% completion rate
                </span>
                <span className="stat">
                  <Clock size={14} />
                  Responds in {item.listedBy.responseTime}
                </span>
              </div>
              {item.listedBy.bio && (
                <p className="user-bio">{item.listedBy.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="view-item-actions">
          {item.status === "available" && onClaim && (
            <>
              <button className="contact-btn" onClick={handleContact}>
                <MessageCircle size={20} />
                Contact
              </button>
              <button className="claim-btn" onClick={handleClaim}>
                Claim Item
              </button>
            </>
          )}
          {item.status === "claimed" && (
            <div className="status-info">
              <p className="claimed-message">This item has been claimed</p>
            </div>
          )}
          {item.status === "completed" && (
            <div className="status-info">
              <p className="completed-message">
                This pickup has been completed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

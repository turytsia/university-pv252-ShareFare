import { MapPin, Calendar, Clock, Dot } from "lucide-react";
import type { FoodItem } from "../types/items";
import "./FoodCard.css";
import VerifiedBadge from "./VerifiedBadge";

interface FoodCardProps {
  item: FoodItem;
  onView: (item: FoodItem) => void;
  actionLabel?: string;
  onAction?: (itemId: string) => void;
  showAuthor?: boolean;
  cardClickable?: boolean;
}

export default function FoodCard({
  item,
  onView,
  actionLabel,
  onAction,
  showAuthor = true,
  cardClickable = true,
}: FoodCardProps) {
  return (
    <div
      className="food-card"
      onClick={cardClickable ? () => onView(item) : undefined}
    >
      <div className="food-card-image">
        <img src={item.image} alt={item.title} />
        <div className="food-card-badges">
          <span className="distance-badge">
            <MapPin size={14} />
            {item.distance} km away
          </span>
          <span className="status-badge available">available</span>
        </div>
      </div>

      <div className="food-card-content">
        <h3 className="food-card-title">{item.title}</h3>
        <p className="food-card-quantity">{item.quantity}</p>

        <div className="food-card-tags">
          {item.dietaryTags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="food-card-info">
          <div className="info-item">
            <Calendar size={14} />
            <span>Best by: {item.bestBy}</span>
          </div>
          <div className="info-item">
            <Clock size={14} />
            <span>{item.pickupWindow}</span>
          </div>
        </div>

        <div className="food-card-footer">
          {showAuthor && (
            <div className="user-info">
              <img src={item.listedBy.avatar} alt={item.listedBy.name} />
              <div className="user-details">
                <div className="user-name">
                  {item.listedBy.name}
                  {item.listedBy.verified && VerifiedBadge({ size: 14 })}
                </div>
                <div className="user-stats">
                  <span className="completion-rate">
                    {item.listedBy.completionRate}% completion
                  </span>
                  <span className="dot-icon">
                    <Dot />
                  </span>
                  <span className="response-time">
                    Responds {item.listedBy.responseTime}
                  </span>
                </div>
              </div>
            </div>
          )}

          {actionLabel && onAction && (
            <button
              className="claim-btn"
              onClick={(e) => {
                e.stopPropagation();
                onAction(item.id);
              }}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";
import type { FoodItem } from "../types/items.ts";
import "./FoodCard.css";

interface FoodCardProps {
  item: FoodItem;
  onClaim: (itemId: string) => void;
  onView: (item: FoodItem) => void;
}

export default function FoodCard({ item, onClaim, onView }: FoodCardProps) {
  return (
    <div className="food-card" onClick={() => onView(item)}>
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
          <div className="user-info">
            <img src={item.listedBy.avatar} alt={item.listedBy.name} />
            <div className="user-details">
              <div className="user-name">
                {item.listedBy.name}
                {item.listedBy.verified && (
                  <CheckCircle2 size={14} className="verified-icon" />
                )}
              </div>
              <div className="user-stats">
                <span className="completion-rate">
                  {item.listedBy.completionRate}% completion
                </span>
                <span className="dot">•</span>
                <span className="response-time">
                  Responds {item.listedBy.responseTime}
                </span>
              </div>
            </div>
          </div>

          <button
            className="claim-btn"
            onClick={(e) => {
              e.stopPropagation();
              onClaim(item.id);
            }}
          >
            Claim Item
          </button>
        </div>
      </div>
    </div>
  );
}

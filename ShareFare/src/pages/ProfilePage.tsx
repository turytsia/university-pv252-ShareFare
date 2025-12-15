import {
  Settings,
  Package,
  Heart,
  TrendingUp,
  Award,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  Dot,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { User, FoodItem } from "../types";
import "./ProfilePage.css";

interface ProfilePageProps {
  user: User;
  userItems: FoodItem[];
  onMarkAsClaimed?: (itemId: string) => void;
}

export default function ProfilePage({
  user,
  userItems,
  onMarkAsClaimed,
}: ProfilePageProps) {
  const navigate = useNavigate();
  const activeItems = userItems.filter((item) => item.status === "available");

  const handleEdit = (itemId: string) => {
    // Navigate to the item view page where they can see details
    // In a real app, this would navigate to an edit page
    navigate(`/item/${itemId}`);
  };

  const handleMarkAsClaimed = (itemId: string) => {
    if (onMarkAsClaimed) {
      onMarkAsClaimed(itemId);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header-section">
        <button className="settings-btn">
          <Settings size={20} />
          Settings
        </button>
      </div>

      <div className="profile-card">
        <div className="profile-info">
          <img src={user.avatar} alt={user.name} className="profile-avatar" />
          <div className="profile-badge">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <h2 className="profile-name">{user.name}</h2>
        <div className="profile-location">
          <MapPin size={14} />
          <span>{user.location}</span>
          <span className="dot-icon">
            <Dot />
          </span>
          <span>Member since {user.memberSince}</span>
        </div>
        <p className="profile-bio">{user.bio}</p>
        <div className="profile-stats-row">
          <div className="profile-stat-item">
            <CheckCircle2 size={16} />
            <span>{user.completionRate}% completion</span>
          </div>
          <div className="profile-stat-item">
            <Clock size={16} />
            <span>Responds {user.responseTime}</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon green">
            <Package size={20} />
          </div>
          <div className="stat-value">{user.stats.itemsShared}</div>
          <div className="stat-label">Items Shared</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red">
            <Heart size={20} />
          </div>
          <div className="stat-value">{user.stats.peopleHelped}</div>
          <div className="stat-label">People Helped</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <TrendingUp size={20} />
          </div>
          <div className="stat-value">{user.stats.itemsReceived}</div>
          <div className="stat-label">Items Received</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow">
            <Award size={20} />
          </div>
          <div className="stat-value">{user.stats.wasteReduced} lbs</div>
          <div className="stat-label">Waste Reduced</div>
        </div>
      </div>

      <div className="impact-banner">
        <Award size={20} />
        <div>
          <strong>Community Impact</strong>
          <p>
            You're in the top 15% of contributors this month! Keep up the
            amazing work.
          </p>
        </div>
      </div>

      <div className="progress-section">
        <h3>Progress to next level</h3>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: "85%" }}></div>
        </div>
        <p className="progress-text">
          Share 6 more items to reach "Community Champion" status!
        </p>
      </div>

      <div className="listings-section">
        <div className="listings-tabs">
          <button className="tab-btn active">Active Listings</button>
          <button className="tab-btn">Donated</button>
          <button className="tab-btn">Received</button>
        </div>

        <div className="listings-grid">
          {activeItems.map((item) => (
            <div key={item.id} className="listing-card">
              <img src={item.image} alt={item.title} />
              <div className="listing-info">
                <h4>{item.title}</h4>
                <p>{item.quantity}</p>
                <div className="listing-meta">
                  <Calendar size={14} />
                  <span>Today 4-7pm</span>
                  <span className="dot-icon">
                    <Dot />
                  </span>
                  <span>Best by {item.bestBy}</span>
                </div>
                <div className="listing-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="mark-claimed-btn"
                    onClick={() => handleMarkAsClaimed(item.id)}
                  >
                    Mark as Claimed
                  </button>
                </div>
              </div>
              <span className="listing-badge available">Available</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

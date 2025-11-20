import { MapPin, MessageCircle, User, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  onOpenMessages?: () => void;
  unreadCount?: number;
}

export default function Header({ onOpenMessages, unreadCount = 0 }: HeaderProps) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          <div className="logo-icon">🥗</div>
          <div className="logo-text">
            <h1>ShareFare</h1>
            <p>Share food, reduce waste</p>
          </div>
        </Link>

        <div className="header-actions">
          {location.pathname === '/' && (
            <div className="location-badge">
              <MapPin size={16} />
              <span>Downtown Berkeley, CA</span>
              <button className="change-btn">Change</button>
            </div>
          )}

          <button className="icon-btn" onClick={onOpenMessages}>
            <ShoppingBag size={20} />
          </button>

          <button className="icon-btn" onClick={onOpenMessages}>
            <MessageCircle size={20} />
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </button>

          <Link to="/profile" className="icon-btn">
            <User size={20} />
          </Link>

          <Link to="/add-item">
            <button className="add-item-btn">
              <span>+</span> Add Item
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

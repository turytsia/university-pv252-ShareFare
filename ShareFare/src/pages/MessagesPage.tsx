import { useState, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { Message as MessageType } from "../types";
import ConfirmModal from "../components/ConfirmModal";
import FeedbackModal from "../components/FeedbackModal";
import OwnerFeedbackModal from "../components/OwnerFeedbackModal";
import "./MessagesPage.css";

interface MessagesPageProps {
  messages: MessageType[];
  onSendMessage: (messageId: string, text: string) => void;
  onCompletePickup: (messageId: string) => void;
  onSubmitOwnerFeedback: (
    messageId: string,
    feedback: {
      responseTime: number;
      comment: string;
    },
  ) => void;
  onSubmitClaimerFeedback: (
    messageId: string,
    feedback: {
      responseTime: number;
      packagingQuality: number;
      contentsQuality: number;
      comment: string;
    },
  ) => void;
}

export default function MessagesPage({
  messages,
  onSendMessage,
  onCompletePickup,
  onSubmitOwnerFeedback,
  onSubmitClaimerFeedback,
}: MessagesPageProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize selectedMessageId based on URL param
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    () => {
      const itemId = searchParams.get("itemId");
      if (itemId && messages.length > 0) {
        const message = messages.find((m) => m.itemId === itemId);
        return message?.id || null;
      }
      return null;
    },
  );

  // Clear the itemId param from URL after initial load if it was used
  useEffect(() => {
    const itemId = searchParams.get("itemId");
    if (itemId) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("itemId");
      setSearchParams(newParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount
  const [messageText, setMessageText] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showOwnerFeedbackModal, setShowOwnerFeedbackModal] = useState(false);
  const [showClaimerFeedbackModal, setShowClaimerFeedbackModal] =
    useState(false);

  // Get the current message from the messages array
  const selectedMessage = selectedMessageId
    ? messages.find((m) => m.id === selectedMessageId) || null
    : null;

  const handleSend = () => {
    if (messageText.trim() && selectedMessage) {
      onSendMessage(selectedMessage.id, messageText);
      setMessageText("");
    }
  };

  const handleCompletePickup = () => {
    if (selectedMessage) {
      onCompletePickup(selectedMessage.id);
      setShowConfirmModal(false);
      // Show owner feedback modal immediately for the owner to rate the claimer's response time
      setShowOwnerFeedbackModal(true);
    }
  };

  const handleSubmitOwnerFeedback = (feedback: {
    responseTime: number;
    comment: string;
  }) => {
    if (selectedMessage) {
      onSubmitOwnerFeedback(selectedMessage.id, feedback);
      setShowOwnerFeedbackModal(false);
    }
  };

  const handleSubmitClaimerFeedback = (feedback: {
    responseTime: number;
    packagingQuality: number;
    contentsQuality: number;
    comment: string;
  }) => {
    if (selectedMessage) {
      onSubmitClaimerFeedback(selectedMessage.id, feedback);
      setShowClaimerFeedbackModal(false);
    }
  };

  return (
    <div className="messages-page">
      {!selectedMessage ? (
        <div className="messages-list">
          <div className="messages-header">
            <button className="back-btn" onClick={() => navigate("/")}>
              <ArrowLeft size={20} />
            </button>
            <h2>Messages</h2>
            <span className="unread-badge">
              {messages.filter((m) => m.unreadCount > 0).length} unread
            </span>
          </div>

          <div className="messages-content">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-item ${message.unreadCount > 0 ? "unread" : ""}`}
                onClick={() => setSelectedMessageId(message.id)}
              >
                <div className="message-item-image">
                  <img src={message.item.image} alt={message.item.title} />
                  <span className={`status-dot ${message.item.status}`}></span>
                </div>
                <div className="message-item-content">
                  <div className="message-item-header">
                    <h3>{message.otherUser.name}</h3>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                  <div className="message-item-info">
                    <img
                      src={message.item.image}
                      alt=""
                      className="item-thumb"
                    />
                    <span className="item-name">{message.item.title}</span>
                    <span className={`item-status ${message.item.status}`}>
                      {message.item.status}
                    </span>
                  </div>
                  <p className="message-preview">{message.lastMessage}</p>
                </div>
                {message.unreadCount > 0 && (
                  <span className="unread-count">{message.unreadCount}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="chat-view">
          <div className="chat-header">
            <button
              className="back-btn"
              onClick={() => setSelectedMessageId(null)}
            >
              <ArrowLeft size={20} />
            </button>
            <div className="chat-header-info">
              <img
                src={selectedMessage.otherUser.avatar}
                alt={selectedMessage.otherUser.name}
              />
              <div>
                <h3>{selectedMessage.otherUser.name}</h3>
                <p>
                  Usually responds in {selectedMessage.otherUser.responseTime}
                </p>
              </div>
            </div>
            <div className="chat-header-actions">
              {selectedMessage.isOwner &&
                selectedMessage.status === "pending" && (
                  <button
                    className="complete-pickup-btn"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    Complete Pickup
                  </button>
                )}
              <button
                className="view-item-btn"
                onClick={() => navigate(`/item/${selectedMessage.item.id}`)}
              >
                View Item
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {selectedMessage.messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-message ${
                  msg.senderId === "system"
                    ? "system"
                    : msg.senderId === "user-1"
                      ? "sent"
                      : "received"
                }`}
              >
                <div className="message-bubble">{msg.text}</div>
                <span className="message-timestamp">{msg.timestamp}</span>
              </div>
            ))}

            {/* Show "Leave Feedback" button for claimer when pickup is completed and they haven't given feedback */}
            {!selectedMessage.isOwner &&
              selectedMessage.status === "completed" &&
              !selectedMessage.claimerFeedbackGiven && (
                <div className="feedback-prompt">
                  <p>The pickup has been completed! How was your experience?</p>
                  <button
                    className="leave-feedback-btn"
                    onClick={() => setShowClaimerFeedbackModal(true)}
                  >
                    Leave Feedback
                  </button>
                </div>
              )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!messageText.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Confirm Modal for Owner to Complete Pickup */}
      {showConfirmModal && (
        <ConfirmModal
          title="Complete Pickup"
          message="Are you sure the pickup has been completed? You'll be asked to rate the other user's response time."
          confirmText="Confirm"
          cancelText="Cancel"
          onConfirm={handleCompletePickup}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      {/* Owner Feedback Modal - Simple rating for claimer's response time */}
      {showOwnerFeedbackModal && selectedMessage && (
        <OwnerFeedbackModal
          claimerName={selectedMessage.otherUser.name}
          itemTitle={selectedMessage.item.title}
          onSubmit={handleSubmitOwnerFeedback}
          onClose={() => setShowOwnerFeedbackModal(false)}
        />
      )}

      {/* Claimer Feedback Modal - Detailed rating after pickup */}
      {showClaimerFeedbackModal && selectedMessage && (
        <FeedbackModal
          otherUserName={selectedMessage.otherUser.name}
          itemTitle={selectedMessage.item.title}
          onSubmit={handleSubmitClaimerFeedback}
          onClose={() => setShowClaimerFeedbackModal(false)}
        />
      )}
    </div>
  );
}

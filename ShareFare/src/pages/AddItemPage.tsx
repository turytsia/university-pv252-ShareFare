import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { FoodItem } from "../types/items";
import { DIETARY_TAGS } from "../constants/dietaryTags";
import "./AddItemPage.css";

interface AddItemPageProps {
  onAddItem: (item: Omit<FoodItem, "id" | "listedBy">) => void;
}

export default function AddItemPage({ onAddItem }: AddItemPageProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    quantity: "",
    description: "",
    dietaryTags: [] as string[],
  });

  const toggleDietaryTag = (tag: string) => {
    setFormData({
      ...formData,
      dietaryTags: formData.dietaryTags.includes(tag)
        ? formData.dietaryTags.filter((t) => t !== tag)
        : [...formData.dietaryTags, tag],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the new item (without id and listedBy, which will be set in App.tsx)
    const newItem: Omit<FoodItem, "id" | "listedBy"> = {
      title: formData.title,
      description: formData.description,
      quantity: formData.quantity,
      category: formData.category as FoodItem["category"],
      image:
        "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=500&q=80", // Default placeholder image
      dietaryTags: formData.dietaryTags,
      bestBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric" },
      ), // 7 days from now
      pickupWindow: "Flexible schedule",
      distance: 0,
      status: "available",
    };

    onAddItem(newItem);
    navigate("/");
  };

  return (
    <div className="add-item-page">
      <div className="add-item-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <ArrowLeft size={20} />
        </button>
        <h2>Share Food</h2>
        <p>Help reduce waste in your community</p>
      </div>

      <form className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label className="form-label">Photo *</label>
          <div className="upload-area">
            <Upload size={32} />
            <p>Click to upload food photo</p>
            <span>PNG, JPG up to 10MB</span>
          </div>
          <p className="form-hint">
            💡 Clear photos help others see what you're sharing. Natural
            lighting works best!
          </p>
        </div>

        <div className="form-section">
          <h3>Basic Information</h3>

          <div className="form-group">
            <label className="form-label">Item Title *</label>
            <input
              type="text"
              placeholder="e.g., Fresh Garden Tomatoes, Homemade Cookies"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              required
            >
              <option value="">Select a category</option>
              <option value="Produce">Produce</option>
              <option value="Dairy">Dairy</option>
              <option value="Prepared Food">Prepared Food</option>
              <option value="Pantry">Pantry</option>
              <option value="Baked Goods">Baked Goods</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Quantity *</label>
            <input
              type="text"
              placeholder="e.g., 3 lbs, 1 loaf, Serves 4"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  quantity: e.target.value,
                })
              }
              required
            />
            <p className="form-hint">
              Be specific to help people understand how much food there is
            </p>
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea
              placeholder="Share more details about the food, how it was prepared, storage instructions, etc."
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              rows={4}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Dietary Tags (Optional)</label>
            <div className="dietary-tags-grid">
              {DIETARY_TAGS.map((tag) => (
                <label key={tag} className="dietary-tag-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.dietaryTags.includes(tag)}
                    onChange={() => toggleDietaryTag(tag)}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
            <p className="form-hint">
              Select tags that describe your food item
            </p>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

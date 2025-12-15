import { useState } from "react";
import { X } from "lucide-react";
import type { CategoryFilter, Filters } from "../types/filters";
import { DIETARY_TAGS } from "../constants/dietaryTags";
import "./FilterModal.css";

interface FilterModalProps {
  filters: Filters;
  onApply: (filters: Filters) => void;
  onClose: () => void;
}

export default function FilterModal({
  filters,
  onApply,
  onClose,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onApply(localFilters);
    onClose();
  };

  const handleReset = () => {
    const defaultFilters: Filters = {
      categories: ["All"],
      maxDistance: 5,
      pickupTime: "any",
      dietary: [],
      verifiedOnly: false,
      sealedPackageOnly: false,
      minCompletionRate: 0,
    };
    setLocalFilters(defaultFilters);
  };

  const toggleDietary = (item: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(item)
        ? prev.dietary.filter((d) => d !== item)
        : [...prev.dietary, item],
    }));
  };

  const toggleCategory = (category: CategoryFilter) => {
    setLocalFilters((prev) => {
      // Clicking "All" resets to all categories
      if (category === "All") {
        return { ...prev, categories: ["All"] };
      }

      const current = prev.categories.filter((c) => c !== "All");
      const exists = current.includes(category);
      const next = exists
        ? current.filter((c) => c !== category)
        : [...current, category];

      // If nothing selected, fall back to "All"
      if (next.length === 0) {
        return { ...prev, categories: ["All"] };
      }

      return { ...prev, categories: next };
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Advanced Filters</h2>
            <p>Refine your search to find exactly what you're looking for</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="filter-section">
            <label className="filter-label">Category</label>
            <div className="chip-group">
              {(
                [
                  "All",
                  "Produce",
                  "Dairy",
                  "Prepared Food",
                  "Pantry",
                  "Baked Goods",
                  "Other",
                ] as CategoryFilter[]
              ).map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`chip ${
                    category === "All"
                      ? localFilters.categories.length === 0 ||
                        localFilters.categories.includes("All")
                        ? "active"
                        : ""
                      : localFilters.categories.includes(category)
                        ? "active"
                        : ""
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">
              <span>Maximum Distance</span>
              <span className="filter-value">
                &lt; {localFilters.maxDistance} km
              </span>
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={localFilters.maxDistance}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  maxDistance: Number(e.target.value),
                })
              }
              className="slider"
            />
            <p className="filter-description">
              Only show items within this distance from your location
            </p>
          </div>

          <div className="filter-section">
            <label className="filter-label">Pickup Time</label>
            <div className="radio-group">
              {[
                { value: "any", label: "Any time" },
                { value: "today", label: "Today" },
                { value: "tomorrow", label: "Tomorrow" },
                { value: "this-week", label: "This week" },
                {
                  value: "flexible",
                  label: "Flexible schedule",
                },
              ].map((option) => (
                <label key={option.value} className="radio-label">
                  <input
                    type="radio"
                    name="pickupTime"
                    value={option.value}
                    checked={localFilters.pickupTime === option.value}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        pickupTime: e.target.value as Filters["pickupTime"],
                      })
                    }
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">Dietary Preferences</label>
            <div className="checkbox-grid">
              {DIETARY_TAGS.map((item) => (
                <label key={item} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={localFilters.dietary.includes(item)}
                    onChange={() => toggleDietary(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">User Trust & Reliability</label>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={localFilters.verifiedOnly}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      verifiedOnly: e.target.checked,
                    })
                  }
                />
                <span>Verified users only</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={localFilters.sealedPackageOnly}
                  onChange={(e) =>
                    setLocalFilters({
                      ...localFilters,
                      sealedPackageOnly: e.target.checked,
                    })
                  }
                />
                <span>Only sealed package</span>
              </label>
            </div>
          </div>

          <div className="filter-section">
            <label className="filter-label">
              <span>Minimum Completion Rate</span>
              <span className="filter-value">
                {localFilters.minCompletionRate > 0
                  ? `${localFilters.minCompletionRate}%`
                  : "Any"}
              </span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={localFilters.minCompletionRate}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  minCompletionRate: Number(e.target.value),
                })
              }
              className="slider"
            />
            <p className="filter-description">
              Only show users with this completion rate or higher
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="reset-btn" onClick={handleReset}>
            <X size={16} />
            Reset All Filters
          </button>
          <button className="apply-btn" onClick={handleApply}>
            <span>✓</span>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

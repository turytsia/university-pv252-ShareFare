import { useState } from "react";
import { Search, SlidersHorizontal, Grid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CategoryFilter, Filters, FoodItem } from "../types";
import FoodCard from "../components/FoodCard.tsx";
import FilterModal from "../components/FilterModal.tsx";
import "./HomePage.css";

interface MyOfferingsPageProps {
  items: FoodItem[];
  onViewItem: (item: FoodItem) => void;
}

const categories: CategoryFilter[] = [
  "All",
  "Produce",
  "Dairy",
  "Prepared Food",
  "Pantry",
  "Baked Goods",
  "Other",
];

export default function MyOfferingsPage({
  items,
  onViewItem,
}: MyOfferingsPageProps) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    maxDistance: 5,
    pickupTime: "any",
    dietary: [],
    verifiedOnly: false,
    sealedPackageOnly: false,
    minCompletionRate: 0,
  });

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesDistance = item.distance <= filters.maxDistance;
    const matchesVerified = !filters.verifiedOnly || item.listedBy.verified;
    const matchesCompletion =
      item.listedBy.completionRate >= filters.minCompletionRate;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDistance &&
      matchesVerified &&
      matchesCompletion
    );
  });

  return (
    <div className="home-page">
      <div className="search-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search your offerings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="filter-btn" onClick={() => setShowFilters(true)}>
          <SlidersHorizontal size={20} />
        </button>
      </div>

      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="results-header">
        <p className="results-count">
          {filteredItems.length} items you've listed
        </p>
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid size={20} />
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <div className={`items-grid ${viewMode}`}>
        {filteredItems.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            onView={() => navigate(`/item/${item.id}`)}
            showAuthor={false}
          />
        ))}
      </div>

      {showFilters && (
        <FilterModal
          filters={filters}
          onApply={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}



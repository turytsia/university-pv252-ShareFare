import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Grid, List } from "lucide-react";
import type { SortOption, FoodItem } from "../types/items";
import type { Filters } from "../types/filters";
import { sortFoodItems } from "../types/items";
import FoodCard from "../components/FoodCard.tsx";
import FilterModal from "../components/FilterModal.tsx";
import "./HomePage.css";

interface HomePageProps {
  items: FoodItem[];
  onViewItem: (item: FoodItem) => void;
  onClaimItem: (itemId: string) => void;
}

export default function HomePage({
  items,
  onViewItem,
  onClaimItem,
}: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    categories: ["All"],
    maxDistance: 5,
    pickupTime: "any",
    dietary: [],
    verifiedOnly: false,
    sealedPackageOnly: false,
    minCompletionRate: 0,
  });
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  const filteredItems = useMemo(() => {
    const base = items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes("All") ||
        filters.categories.includes(item.category);
      const matchesDistance = item.distance <= filters.maxDistance;
      const matchesVerified = !filters.verifiedOnly || item.listedBy.verified;
      const matchesCompletion =
        item.listedBy.completionRate >= filters.minCompletionRate;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDistance &&
        matchesVerified &&
        matchesCompletion &&
        item.status === "available"
      );
    });

    return sortFoodItems(base, sortBy);
  }, [items, searchQuery, filters, sortBy]);

  return (
    <div className="home-page">
      <div className="search-section">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="filter-btn" onClick={() => setShowFilters(true)}>
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </button>
      </div>

      <div className="results-header">
        <p className="results-count">
          {filteredItems.length} items available near you
        </p>
        <div className="results-controls">
          <div className="sort-select-wrapper">
            <label htmlFor="sort-select">Sort by</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="relevance">Relevance</option>
              <option value="distance">Distance</option>
              <option value="best-by">Best by date</option>
              <option value="recent">Newest first</option>
            </select>
          </div>
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
      </div>

      <div className={`items-grid ${viewMode}`}>
        {filteredItems.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            onView={onViewItem}
            actionLabel="Claim Item"
            onAction={onClaimItem}
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

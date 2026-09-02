import { Select } from "./select";

export type SortValue = "added-desc" | "added-asc" | "rating-desc" | "title-asc";
export type FilterValue = "all" | "movie" | "tv";

interface SavedListToolbarProps {
  filter: FilterValue;
  onFilterChange: (value: FilterValue) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
}

export function SavedListToolbar({
  filter,
  onFilterChange,
  sort,
  onSortChange,
}: SavedListToolbarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="w-40">
        <Select
          label="Type"
          value={filter}
          onChange={(value) => onFilterChange(value as FilterValue)}
          options={[
            { label: "All", value: "all" },
            { label: "Movies", value: "movie" },
            { label: "TV Shows", value: "tv" },
          ]}
        />
      </div>
      <div className="w-48">
        <Select
          label="Sort by"
          value={sort}
          onChange={(value) => onSortChange(value as SortValue)}
          options={[
            { label: "Recently added", value: "added-desc" },
            { label: "Oldest added", value: "added-asc" },
            { label: "Highest rated", value: "rating-desc" },
            { label: "Title (A–Z)", value: "title-asc" },
          ]}
        />
      </div>
    </div>
  );
}

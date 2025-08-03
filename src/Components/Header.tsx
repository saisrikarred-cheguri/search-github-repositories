import { Github } from "lucide-react";
import { Container } from "./ui";
import { SearchInput } from "./SearchInput";
import { SortOptions } from "./SortOptions";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  loading: boolean;
  totalCount: number;
  sort: "stars" | "forks" | "updated";
  order: "desc" | "asc";
  onSortChange: (sort: "stars" | "forks" | "updated") => void;
  onOrderChange: (order: "desc" | "asc") => void;
}

function Header({
  searchQuery,
  onSearchChange,
  loading,
  totalCount,
  sort,
  order,
  onSortChange,
  onOrderChange,
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <Container className="py-6">
        <div className="flex items-center space-x-3 mb-6">
          <Github className="w-8 h-8 text-gray-900" />
          <h1 className="text-2xl font-bold text-gray-900">
            Repository Search
          </h1>
        </div>
        <div className="space-y-4">
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search GitHub repositories..."
            disabled={loading}
          />
          {searchQuery.trim() && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600">
                {loading
                  ? "Searching ..."
                  : totalCount > 0
                  ? `Found ${totalCount.toLocaleString()} repositories`
                  : searchQuery.trim() && !loading
                  ? "No repositories found"
                  : null}
              </div>
              <SortOptions
                sort={sort}
                order={order}
                onSortChange={onSortChange}
                onOrderChange={onOrderChange}
                disabled={loading}
              />
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;

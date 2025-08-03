import { useCallback, useEffect, useState } from "react";
import "./globals.css";
import { type SearchParams } from "./types/githubInterfaces";
import { useDebounce } from "./hooks/useDebounce";
import {
  Header,
  Footer,
  ErrorMessage,
  LoadingSkeleton,
  EmptyState,
  RepositoryCard,
  Pagination,
} from "./Components";
import { Container } from "./Components/ui";
import { useGitHubSearch } from "./hooks/useGithubSearch";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    sort: "stars",
    order: "desc",
    page: 1,
    per_page: 12,
  });

  const debounceQuery = useDebounce(searchQuery, 500);

  // updating search params when debouncequery changes
  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      query: debounceQuery,
      page: 1, // reset to first page on new search
    }));
  }, [debounceQuery]);

  //using react query for api calls
  const {
    data: searchResponse,
    isLoading,
    error,
    refetch,
  } = useGitHubSearch(searchParams);

  const repositories = searchResponse?.items || [];
  const totalCount = searchResponse?.total_count || 0;

  //handling search query changes
  // useEffect(() => {
  //   const newParams = {
  //     ...searchParams,
  //     query: debounceQuery,
  //     page: 1,
  //   };
  //   setSearchParams(newParams);
  //   performSearch(newParams);
  // }, [debounceQuery, searchParams.sort, searchParams.order, performSearch]);

  // handling pagination
  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams((prev) => ({ ...prev, page }));
    },
    [searchParams]
  );

  //handle sort change
  const handleSortChange = useCallback(
    (sort: "stars" | "forks" | "updated") => {
      setSearchParams((prev) => ({ ...prev, sort, page: 1 }));
    },
    [searchParams]
  );

  //handle order change
  const handleOrderChange = useCallback(
    (order: "desc" | "asc") => {
      setSearchParams((prev) => ({ ...prev, order, page: 1 }));
    },
    [searchParams]
  );

  //handling retries
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);


  return (
    <div>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        loading={isLoading}
        totalCount={totalCount}
        sort={searchParams.sort}
        order={searchParams.order}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
      />
      <main>
        <Container className="py-8">
          {error && (
            <div className="mb-8">
              <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
          )}
          {isLoading && <LoadingSkeleton />}
          {!isLoading && !error && repositories.length === 0 && (
            <EmptyState query={searchQuery.trim()} />
          )}

          {!isLoading && !error && repositories.length > 0 && (
            <>
              <div className="grid gap-4 mb-8">
                {repositories.map((repo) => (
                  <RepositoryCard key={repo.id} repository={repo} />
                ))}
              </div>
              <Pagination
                currentPage={searchParams.page}
                totalCount={totalCount}
                perPage={searchParams.per_page}
                onPageChange={handlePageChange}
                disabled={isLoading}
              />
            </>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default App;

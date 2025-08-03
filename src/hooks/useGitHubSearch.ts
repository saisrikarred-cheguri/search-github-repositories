import { useQuery } from "@tanstack/react-query";
import { searchRepositories } from "../services/github";
import type { SearchParams } from "../types/githubInterfaces";

export function useGitHubSearch(params: SearchParams){
    return useQuery({
        queryKey: ['github-search', params],
        queryFn: () => searchRepositories(params),
        enabled: !!params.query.trim(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors (client errors)
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }
          return failureCount < 2;
        },
      });
}
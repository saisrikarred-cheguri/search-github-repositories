import type { SearchParams, SearchResponse } from "../types/githubInterfaces";

const GITHUB_BASE_URL = 'https://api.github.com';

export class GitHubAPIError extends Error {
    constructor(
      message: string,
      public status?: number,
      public response?: any
    ) {
      super(message);
      this.name = 'GitHubAPIError';
    }
  }

export async function searchRepositories(params: SearchParams): Promise<SearchResponse> {
    const { query, sort, order, page, per_page } = params;
    
    if (!query.trim()) {
      return {
        total_count: 0,
        incomplete_results: false,
        items: []
      };
    }
  
    const searchParams = new URLSearchParams({
      q: query.trim(),
      sort,
      order,
      page: page.toString(),
      per_page: per_page.toString()
    });
  
    try {
      const response = await fetch(`${GITHUB_BASE_URL}/search/repositories?${searchParams}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new GitHubAPIError(
          errorData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof GitHubAPIError) {
        throw error;
      }
      throw new GitHubAPIError('Network error occurred while searching repositories');
    }
  }
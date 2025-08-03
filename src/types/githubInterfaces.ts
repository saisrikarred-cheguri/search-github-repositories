export interface Repository{
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
    owner: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
    topics: string[];
}

export interface SearchResponse{
    total_count: number;
    incomplete_results: boolean;
    items: Repository[];
}

export interface SearchParams{
    query: String;
    sort: 'stars' | 'forks' | 'updated';
    order: 'desc' | 'asc';
    page: number;
    per_page: number;
}
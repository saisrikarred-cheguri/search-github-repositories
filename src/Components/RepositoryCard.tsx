import { Star, GitFork, ExternalLink } from "lucide-react";
import { type Repository } from "../types/githubInterfaces";
import { Card, Badge, Button } from "./ui";

interface RepositoryCardProps {
  repository: Repository;
}

export default function RepositoryCard({ repository }: RepositoryCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <Card hover padding="md">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-sm text-gray-600">
              {repository.owner.login}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              {repository.name}
            </a>
          </h3>

          {repository.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {repository.description}
            </p>
          )}

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{formatNumber(repository.stargazers_count)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="w-4 h-4" />
              <span>{formatNumber(repository.forks_count)}</span>
            </div>
            {repository.language && (
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>{repository.language}</span>
              </div>
            )}
            <span>Updated {formatDate(repository.updated_at)}</span>
          </div>

          {repository.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {repository.topics.slice(0, 5).map((topic) => (
                <Badge key={topic} variant="primary" size="sm">
                  {topic}
                </Badge>
              ))}
              {repository.topics.length > 5 && (
                <span className="text-xs text-gray-500">
                  +{repository.topics.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>

        <Button
          as="a"
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="sm"
          icon={ExternalLink}
          className="ml-4"
          aria-label="View repository on GitHub"
        />
      </div>
    </Card>
  );
}

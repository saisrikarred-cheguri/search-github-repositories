
import { Search } from "lucide-react";
import { Card } from "./ui/Card";

interface EmptyStateProps {
  query: String;
}

const EmptyState = ({ query }: EmptyStateProps) => {
  return (
    <Card className="bg-gray-50 text-center" padding="lg">
      <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {query ? "No repositories found" : "Start searching"}
      </h3>
      <p className="text-gray-600 max-w-md mx-auto">
        {query
          ? `We couldn not find any repositories matching "${query}". Please adjusting your search terms or filters.`
          : "Enter a search term above to find GitHub repositories. You can search by name, description, or topic."}
      </p>
    </Card>
  );
};

export default EmptyState;

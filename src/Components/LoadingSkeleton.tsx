import { Card, Skeleton } from "./ui";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }, (_, i) => (
        <Card key={i} padding="md">
          <div className="flex items-start space-x-4">
            <Skeleton variant="circular" width={20} height={20} />
            <div className="flex-1">
              <Skeleton className="w-24 h-4 mb-2" />
              <Skeleton className="w-48 h-6 mb-3" />
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-3/4 h-4 mb-3" />
              <div className="flex space-x-4">
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-12 h-4" />
                <Skeleton className="w-16 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default LoadingSkeleton;

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Card, Button } from './ui';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Card className="bg-red-50 border-red-200 text-center" padding="md">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
      <p className="text-red-700 mb-4">{message}</p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="danger"
          icon={RefreshCw}
        >
          Try Again
        </Button>
      )}
    </Card>
  );
}
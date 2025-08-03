import { Select } from './ui';

interface SortOptionsProps {
  sort: 'stars' | 'forks' | 'updated';
  order: 'desc' | 'asc';
  onSortChange: (sort: 'stars' | 'forks' | 'updated') => void;
  onOrderChange: (order: 'desc' | 'asc') => void;
  disabled?: boolean;
}

export function SortOptions({ sort, order, onSortChange, onOrderChange, disabled = false }: SortOptionsProps) {
  const sortOptions = [
    { value: 'stars', label: 'Stars' },
    { value: 'forks', label: 'Forks' },
    { value: 'updated', label: 'Recently Updated' }
  ];

  const orderOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as 'stars' | 'forks' | 'updated')}
        disabled={disabled}
        options={sortOptions}
      />
      
      <Select
        value={order}
        onChange={(e) => onOrderChange(e.target.value as 'desc' | 'asc')}
        disabled={disabled}
        options={orderOptions}
      />
    </div>
  );
}
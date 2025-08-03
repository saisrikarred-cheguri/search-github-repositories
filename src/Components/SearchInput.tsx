import { Search } from 'lucide-react';
import { Input } from './ui';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function SearchInput({ value, onChange, placeholder = "Search repositories...", disabled = false }: SearchInputProps) {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      icon={Search}
      variant="search"
    />
  );
}
import { useEffect, useRef } from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="mb-4">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Widgets..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded-md w-full"
      />
    </div>
  );
}

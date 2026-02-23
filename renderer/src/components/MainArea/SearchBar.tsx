import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { SearchBarProps } from '../../types/types';

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
    return (
        <div className="relative">
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            ></FontAwesomeIcon>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 rounded-md bg-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
        </div>
    );
}

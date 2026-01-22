import type { TabItemProps } from '../../types/types';

export function TabItem({ onClick, isActive, colorClass, tabName }: TabItemProps) {
    return (
        <li>
            <button
                onClick={onClick}
                className={`group relative w-full text-left px-4 py-2 rounded-md transition cursor-pointer ${
                    isActive
                        ? 'bg-neutral-700/60 text-white font-medium'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/40'
                }`}
            >
                <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r ${
                        isActive ? `${colorClass}` : 'bg-transparent group-hover:bg-neutral-500'
                    }`}
                />
                {tabName}
            </button>
        </li>
    );
}

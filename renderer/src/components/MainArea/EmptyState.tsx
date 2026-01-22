import type { EmptyStateProps } from '../../types/types';

export function EmptyState({ title, subtitle }: EmptyStateProps) {
    return (
        <div className="flex flex-1 items-center justify-center text-neutral-400">
            <div className="text-center">
                <p className="text-lg font-medium">{title}</p>
                <p className="text-sm mt-1">{subtitle}</p>
            </div>
        </div>
    );
}

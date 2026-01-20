import type { SideAreaProps } from '../../types/types';

export function SideArea({ onLibraryClick, onShuffleClick, activeTab }: SideAreaProps) {
    return (
        <aside className="w-1/4 min-w-[220px] max-w-[320px] bg-neutral-800 border-r border-neutral-700 p-6 flex flex-col gap-6">
            <h1 className="text-xl font-semibold tracking-wide">MP3 Player</h1>
            <nav>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={onLibraryClick}
                            className={`group relative w-full text-left px-4 py-2 rounded-md transition cursor-pointer
                                ${
                                    activeTab === 'library'
                                        ? 'bg-neutral-700/60 text-white font-medium'
                                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/40'
                                }`}
                        >
                            <span
                                className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r
                                    ${
                                        activeTab === 'library'
                                            ? 'bg-blue-500'
                                            : 'bg-transparent group-hover:bg-neutral-500'
                                    }`}
                            />
                            Library
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={onShuffleClick}
                            className={`group relative w-full text-left px-4 py-2 rounded-md transition cursor-pointer
                                ${
                                    activeTab === 'shuffle'
                                        ? 'bg-neutral-700/60 text-white font-medium'
                                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/40'
                                }`}
                        >
                            <span
                                className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r
                                    ${
                                        activeTab === 'shuffle'
                                            ? 'bg-purple-500'
                                            : 'bg-transparent group-hover:bg-neutral-500'
                                    }`}
                            />
                            Shuffled
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

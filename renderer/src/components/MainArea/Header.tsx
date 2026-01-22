import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle, faFolder } from '@fortawesome/free-solid-svg-icons';
import type { HeaderProps } from '../../types/types';

export function Header({ activeTab, songs, onShuffle, onSelectFolder }: HeaderProps) {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between bg-neutral-900/90 backdrop-blur py-4 mb-6">
            <h2 className="text-lg font-semibold">
                {activeTab === 'shuffle' ? 'Shuffled' : 'Library'}
            </h2>
            <div className="flex gap-2">
                <button
                    onClick={onShuffle}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 transition cursor-pointer"
                    disabled={!songs.length}
                >
                    <FontAwesomeIcon icon={faShuffle}></FontAwesomeIcon>
                    Shuffle
                </button>
                <button
                    onClick={onSelectFolder}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition cursor-pointer"
                >
                    <FontAwesomeIcon icon={faFolder}></FontAwesomeIcon>
                    Select folder
                </button>
            </div>
        </header>
    );
}

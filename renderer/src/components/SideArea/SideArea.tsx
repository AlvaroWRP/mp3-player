import type { SideAreaProps } from '../../types/types';

export function SideArea({ onLibraryClick, onShuffleClick }: SideAreaProps) {
    return (
        <aside>
            <h1>Music Player</h1>
            <nav>
                <ul>
                    <li>
                        <button onClick={onLibraryClick}>Library</button>
                    </li>
                    <li>
                        <button onClick={onShuffleClick}>Shuffled</button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

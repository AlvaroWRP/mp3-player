import { TabItem } from './TabItem';
import { ProgramName } from './ProgramName';
import type { SideAreaProps } from '../../types/types';

export function SideArea({ onLibraryClick, onShuffleClick, activeTab }: SideAreaProps) {
    return (
        <aside className="w-1/4 min-w-[220px] max-w-[320px] bg-neutral-800 border-r border-neutral-700 p-6 flex flex-col gap-6">
            <ProgramName></ProgramName>
            <nav>
                <ul className="space-y-2">
                    <TabItem
                        onClick={onLibraryClick}
                        isActive={activeTab === 'library'}
                        colorClass="bg-blue-500"
                        tabName="Library"
                    ></TabItem>
                    <TabItem
                        onClick={onShuffleClick}
                        isActive={activeTab === 'shuffle'}
                        colorClass="bg-purple-500"
                        tabName="Shuffled"
                    ></TabItem>
                </ul>
            </nav>
        </aside>
    );
}

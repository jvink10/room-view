import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import BackgroundInput from './BackgroundInput';
import LayerList from './LayerList';
import RoomSettings from './RoomSettings';
import GroupList from './GroupList';

type Props = {
    updateBackgroundFile: Function;
    updateLayer: Function;
    updateLayerVisibility: Function;
    removeLayer: Function;
    backgrounds: Array<{ id: number; name: string; image: string; height: number; width: number; visible: boolean }>;
    isPinging: boolean;
    visibleColors: Array<{ color: string; visible: boolean }>;
    updatePinging: Function;
    updateColorVisibility: Function;
    groups: Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>;
    updateGroupVisibility: Function;
    newGroup: Function;
    removeGroup: Function;
    updateGroup: Function;
    newSubGroup: Function;
    removeSubGroup: Function;
    updateSubGroup: Function;
};

export default function RoomTab(props: Props) {
    return (
        <div>
            <Link href="/create" className="block m-2 border-2 rounded-full border-gray-200 py-1 px-4 w-fit">
                    <span><AiOutlineArrowLeft className="inline" /> Back To Create</span>
            </Link>
            <h2 className="pb-2 px-4 text-xl text-left">Background</h2>
            <div className="border-t border-gray-100 p-4">
                <BackgroundInput updateBackgroundFile={props.updateBackgroundFile} />
            </div>
            <div className="border-t border-gray-100 p-4">
                <LayerList updateLayer={props.updateLayer} updateLayerVisibility={props.updateLayerVisibility} removeLayer={props.removeLayer} backgrounds={props.backgrounds} />
            </div>
            <div className="border-t border-gray-100 py-8 px-4">
                <RoomSettings isPinging={props.isPinging} visibleColors={props.visibleColors} updatePinging={props.updatePinging} updateColorVisibility={props.updateColorVisibility} />
            </div>
            <div className="border-t border-gray-100 p-8 text-left">
                <GroupList groups={props.groups} updateGroupVisibility={props.updateGroupVisibility} newGroup={props.newGroup} removeGroup={props.removeGroup} updateGroup={props.updateGroup} newSubGroup={props.newSubGroup} removeSubGroup={props.removeSubGroup} updateSubGroup={props.updateSubGroup} />
            </div>
        </div>
    );
};

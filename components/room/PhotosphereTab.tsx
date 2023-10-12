import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

import PhotosphereInput from './PhotosphereInput';
import PhotosphereList from './PhotosphereList';

type Props = {
    updatePhotosphereFile: Function;
    backgrounds: Array<{ id: number; name: string; image: string; height: number; width: number; visible: boolean }>;
    photospheres: Array<{ id: number; name: string; image: string; topPos: number; leftPos: number; color: string; visible: boolean; groups: Array<{ group: number; subGroup: number }>; layer: number }>;
    groups: Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>;
    updatePhotosphere: Function;
    removePhotosphere: Function;
};

export default function PhotosphereTab(props: Props) {
    return (
        <div>
            <Link href="/photosphere" className="block m-2 ml-auto border-2 rounded-full border-gray-200 py-1 px-4 w-fit">
                <span>Go To Photospheres <AiOutlineArrowRight className="inline" /></span>
            </Link>
            <h2 className="pb-2 px-4 text-xl text-right">Photospheres</h2>
            <div className="border-t border-gray-100 py-4 px-4">
                <PhotosphereInput updatePhotosphereFile={props.updatePhotosphereFile} />
            </div>
            <div>
                <PhotosphereList backgrounds={props.backgrounds} photospheres={props.photospheres} groups={props.groups} updatePhotosphere={props.updatePhotosphere} removePhotosphere={props.removePhotosphere} />
            </div>
        </div>
    );
};

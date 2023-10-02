'use client'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

type Props = {
    id: number;
    name: string;
    image: string;
    topPos: number;
    leftPos: number;
    visible: boolean;
    groups: Array<{ group: string; subGroup: string }>;
    ping: boolean;
};

export default function PhotoSphere(props: Props) {
    const color = props.groups.find(group => group.group === "Color")?.subGroup;

    //Determine position offset
    const topDiff = 50 - props.topPos;
    const topOffset = Math.floor(topDiff * 3 - 160);

    const leftDiff = 50 - props.leftPos;
    const leftOffset = Math.floor(leftDiff * 3 - 144);

    return (
        <div className={`${props.visible ? "" : "hidden"} absolute group border-2 rounded-full border-white h-4 w-4 bg-photosphere-${color}`} style={{top: `calc(${props.topPos}% - 8px)`, left: `calc(${props.leftPos}% - 8px)`}}>
            <div className={`relative rounded-full h-4 w-4 -top-0.5 -left-0.5 bg-white ${props.ping ? "animate-ping" : "hidden"}`}></div>
            <div className={`relative hidden group-hover:block h-[300px] w-[300px] z-10`} style={{top: `${topOffset}px`, left: `${leftOffset}px`}}>
                <ReactPhotoSphereViewer
                    src={props.image}
                    height={"100%"}
                    width={"100%"}
                    container={''}
                    fisheye={true}
                    navbar={['fullscreen']}
                ></ReactPhotoSphereViewer>
            </div>
        </div>
    );
};

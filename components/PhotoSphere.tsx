'use client'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

type Props = {
    id: number;
    name: string;
    image: string;
    topPos: number;
    leftPos: number;
    color?: string;
    ping?: boolean;
};

export default function PhotoSphere(props: Props) {
    const topOffset = (props.topPos >= 80 ? "-top-[300px]" : (props.topPos <= 20 ? "-top-[16px]" : "-top-[158px]"));
    const leftOffset = (props.leftPos >= 80 ? "-left-[284px]" : (props.leftPos <= 20 ? "" : "-left-[142px]"))

    return (
        <div className={`absolute group border-2 rounded-full border-white h-4 w-4 ${props.color ? props.color : "bg-gray-400"}`} style={{top: `calc(${props.topPos}% - 8px)`, left: `calc(${props.leftPos}% - 8px)`}}>
            <div className={`relative rounded-full h-4 w-4 -top-0.5 -left-0.5 bg-white ${props.ping ? "animate-ping" : "hidden"}`}></div>
            <div className={`relative hidden group-hover:block h-[300px] w-[300px] ${topOffset} ${leftOffset} z-10`}>
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

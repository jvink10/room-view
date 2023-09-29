'use client'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

type Props = {
    id: number;
    name: string;
    image: string;
    topPos: string;
    leftPos: string;
    color?: string;
    ping?: boolean;
};

export default function PhotoSphere(props: Props) {
    return (
        <div className={`absolute group border-2 rounded-full border-white h-4 w-4 ${props.color ? props.color : "bg-gray-400"}`} style={{top: `${props.topPos}`, left: `${props.leftPos}`}}>
            <div className={`relative rounded-full h-4 w-4 -top-0.5 -left-0.5 bg-white ${props.ping ? "animate-ping" : "hidden"}`}></div>
            <div className="relative hidden group-hover:block h-[300px] w-[300px] -top-[148px] -left-[148px] z-10">
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

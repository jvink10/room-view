'use client'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

type Props = {
    image: string;
    topPos: string;
    leftPos: string;
    bgColor?: string;
};

export default function PhotoSphere(props: Props) {
    return (
        <div className={`absolute group border-2 rounded-full border-white h-4 w-4 ${props.bgColor ? props.bgColor : "bg-gray-400"}`} style={{top: `${props.topPos}`, left: `${props.leftPos}`}}>
            <div className="relative rounded-full h-4 w-4 -top-0.5 -left-0.5 bg-white animate-ping"></div>
            <div className="relative hidden group-hover:block -top-[148px] -left-[148px] z-10">
                <ReactPhotoSphereViewer
                    src={props.image}
                    width="300"
                    height="300"
                    container={''}
                    fisheye={true}
                    navbar={['fullscreen']}
                ></ReactPhotoSphereViewer>
            </div>
        </div>
    );
};

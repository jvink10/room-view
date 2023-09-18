'use client'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

type Props = {
    image: string;
    topPos: string;
    leftPos: string;
};

export default function PhotoSphere(props: Props) {
    return (
        <div className={`absolute group rounded-full h-2 w-2 bg-gray-400`} style={{top: `${props.topPos}`, left: `${props.leftPos}`}}>
            <div className="relative hidden group-hover:block -top-[149px] -left-[149px] z-10">
                <ReactPhotoSphereViewer
                    src={props.image}
                    width="300"
                    height="300"
                    container={''}
                    fisheye={true}
                    navbar={false}
                ></ReactPhotoSphereViewer>
            </div>
        </div>
    );
};

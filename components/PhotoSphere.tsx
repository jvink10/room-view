'use client'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

type Props = {
    image: string;
    topPos: number;
    leftPos: number;
};

export default function PhotoSphere(props: Props) {
    return (
        <div className={`absolute group h-4 w-4 top-[${props.topPos}%] left-[${props.leftPos}%] bg-white`}>
            <div className="relative hidden group-hover:block -top-1/2 -left-1/2">
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

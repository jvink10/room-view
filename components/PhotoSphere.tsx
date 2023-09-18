'use client'
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';

type Props = {
    image: string;
    topPos: string;
    leftPos: string;
};

export default function PhotoSphere(props: Props) {
    return (
        <div className={`absolute group h-4 w-4 bg-white`} style={{top: `${props.topPos}`, left: `${props.leftPos}`}}>
            <div className="relative hidden group-hover:block -top-[148px] -left-[148px] z-10">
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

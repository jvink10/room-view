import Image from 'next/image';

import PhotoSphere from '../components/PhotoSphere';

type Props = {
    image: string;
    height: number;
    width: number;
    photoSphere?: Array<{image: string; topPos: string; leftPos: string; bgColor?: string}>;
};

export default function Room(props: Props) {
    return (
        <div className="relative w-fit">
            <Image
                src={`${props.image}`}
                alt="Room background image"
                height={props.height}
                width={props.width}
                className="object-contain"
            />
            <div className="absolute inset-0">
                {props.photoSphere ? props.photoSphere.map((photoSphere, index) => (
                    <PhotoSphere key={index} image={photoSphere.image} topPos={photoSphere.topPos} leftPos={photoSphere.leftPos} bgColor={photoSphere.bgColor} />
                )) : null}
            </div>
        </div>
    );
};

import Image from 'next/image';

import PhotoSphere from '../components/PhotoSphere';

type Props = {
    image: string;
    height: number;
    width: number;
};

export default function Room(props: Props) {
    return (
        <div className="relative">
            <Image
                src={`${props.image}`}
                alt="Room background image"
                height={props.height}
                width={props.width}
                className="object-contain"
            />
            <div className="absolute inset-0">
				<PhotoSphere image="/bardon-esplanade-park.jpg" topPos="75%" leftPos="20%" />
            </div>
        </div>
    );
};

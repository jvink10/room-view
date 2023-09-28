import Image from 'next/image';

import PhotoSphere from '../components/PhotoSphere';

type Props = {
    id: number;
    name: string;
    image: string;
    height: number;
    width: number;
    photosphere?: Array<{id: number; name: string; image: string; topPos: string; leftPos: string; color?: string}>;
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
                {props.photosphere ? props.photosphere.map((photosphere, index) => (
                    <PhotoSphere key={index} id={photosphere.id} name={photosphere.name} image={photosphere.image} topPos={photosphere.topPos} leftPos={photosphere.leftPos} color={photosphere.color} />
                )) : null}
            </div>
        </div>
    );
};

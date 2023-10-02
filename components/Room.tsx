import Image from 'next/image';

import PhotoSphere from '../components/PhotoSphere';

type Props = {
    id: number;
    name: string;
    image: string;
    height: number;
    width: number;
    ping?: boolean;
    photospheres?: Array<{id: number; name: string; image: string; topPos: number; leftPos: number; visible: boolean; color?: string}>;
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
                {props.photospheres ? props.photospheres.map((photosphere) => (
                    <PhotoSphere key={photosphere.id} id={photosphere.id} name={photosphere.name} image={photosphere.image} topPos={photosphere.topPos} leftPos={photosphere.leftPos} visible={photosphere.visible} color={photosphere.color} ping={props.ping} />
                )) : null}
            </div>
        </div>
    );
};

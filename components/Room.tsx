import Image from 'next/image';

import PhotoSphere from '../components/PhotoSphere';

type Props = {
    background: { id: number; name: string; image: string; height: number; width: number};
    photospheres?: Array<{id: number; name: string; image: string; topPos: number; leftPos: number; visible: boolean; color: string; time: string}>;
    groups: Array<{ name: string, subGroups: Array<{ name: string, visible: boolean, photosphereIds: number[] }> }>;
    ping: boolean;
};

export default function Room(props: Props) {
    return (
        <div className="relative w-fit">
            <Image
                src={`${props.background.image}`}
                alt="Room background image"
                height={props.background.height}
                width={props.background.width}
                className="object-contain"
            />
            <div className="absolute inset-0">
                {props.photospheres ? props.photospheres.map((photosphere) => (
                    <PhotoSphere key={photosphere.id} id={photosphere.id} name={photosphere.name} image={photosphere.image} topPos={photosphere.topPos} leftPos={photosphere.leftPos} visible={photosphere.visible} color={photosphere.color} time={photosphere.time} ping={props.ping} />
                )) : null}
            </div>
        </div>
    );
};

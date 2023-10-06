import Image from 'next/image';

import PhotoSphere from './PhotoSphere';

type Props = {
    background: { id: number; name: string; image: string; height: number; width: number };
    photospheres?: Array<{ id: number; name: string; image: string; topPos: number; leftPos: number; color: string; visible: boolean; groups: Array<{ group: number; subGroup: number }> }>;
    groups: Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>;
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
                    <PhotoSphere key={photosphere.id} id={photosphere.id} name={photosphere.name} image={photosphere.image} topPos={photosphere.topPos} leftPos={photosphere.leftPos} color={photosphere.color} visible={photosphere.visible} groups={photosphere.groups} ping={props.ping} />
                )) : null}
            </div>
        </div>
    );
};

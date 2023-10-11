import Image from 'next/image';

import PhotoSphere from './PhotoSphere';

type Props = {
    backgrounds: Array<{ id: number; name: string; image: string; height: number; width: number; visible: boolean }>;
    photospheres: Array<{ id: number; name: string; image: string; topPos: number; leftPos: number; color: string; visible: boolean; groups: Array<{ group: number; subGroup: number }> }>;
    groups: Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>;
    ping: boolean;
};

export default function RoomDisplay(props: Props) {
    return (
        <div className="relative w-fit">
            {props.backgrounds.map((background) => (
                <div className={`${background.visible ? "" : "hidden"}`}>
                    <Image
                        src={`${background.image}`}
                        alt={`${background.name}`}
                        height={background.height}
                        width={background.width}
                        className="object-contain"
                    />
                </div>
            ))}
            <div className="absolute inset-0">
                {props.photospheres.map((photosphere) => (
                    <PhotoSphere key={photosphere.id} id={photosphere.id} name={photosphere.name} image={photosphere.image} topPos={photosphere.topPos} leftPos={photosphere.leftPos} color={photosphere.color} visible={photosphere.visible} groups={photosphere.groups} ping={props.ping} />
                ))}
            </div>
        </div>
    );
};

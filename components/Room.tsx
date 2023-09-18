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
                <PhotoSphere image="/bardon-park-bridge.jpg" topPos="68%" leftPos="68%" />
                <PhotoSphere image="/bowman-park.jpg" topPos="93%" leftPos="53%" />
                <PhotoSphere image="/dawn-street-park.jpg" topPos="30%" leftPos="58%" />
                <PhotoSphere image="/glen-harding-park.jpg" topPos="20%" leftPos="58%" />
                <PhotoSphere image="/lions-park.jpg" topPos="10%" leftPos="80%" />
                <PhotoSphere image="/lions-park-parking.jpg" topPos="22%" leftPos="67%" />
                <PhotoSphere image="/st-josephs-lunch-area.jpg" topPos="86%" leftPos="66%" />
            </div>
        </div>
    );
};

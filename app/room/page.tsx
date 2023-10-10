import { Metadata, ResolvingMetadata } from 'next';

import roomData from '../../data/room-data';
import Room from '../../components/room/Room';

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const searchParamsId = searchParams.id;

    const roomIndex = roomData.findIndex(room => String(room.id) === searchParamsId);

    const room = roomIndex !== -1 ? roomData[roomIndex] : roomData[0];

    const name = room.name;
      
    return {
        title: `${name} - Room View`,
    };
};

export default function RoomPage() {
    return (
        <main>
            <Room />
        </main>
    );
};

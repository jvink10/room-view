import { Metadata, ResolvingMetadata } from 'next';

import { newRoom, exampleRoom } from '../../data/room-data';
import Room from '../../components/room/Room';

type Props = {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
    { searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const searchParamsId = searchParams.id;

    let name;

    if (searchParamsId === "1") {
        name = exampleRoom.background.name;
    } else {
        name = newRoom.background.name;
    };
      
    return {
        title: `${name} - Room View`,
    };
};

export default function RoomPage({ searchParams }: Props) {
    return (
        <main>
            <Room />
        </main>
    );
};

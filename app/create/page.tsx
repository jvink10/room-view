import type { Metadata } from 'next';

import CreateLink from '../../components/CreateLink';

export const metadata: Metadata = {
    title: 'Create - Room View',
    description: 'Create or View a Room',
};

export default function Create() {
    return (
        <main>
            <CreateLink text="New Room" path="/room" query={{id: "0"}} />
            <CreateLink text="Example Room" path="/room" query={{id: "1"}} />
            <CreateLink text="New Photosphere" path="/photosphere" />
        </main>
    );
};

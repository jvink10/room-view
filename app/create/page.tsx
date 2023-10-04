import CreateLink from '../../components/CreateLink';

export default function Create() {
    return (
        <main>
            <CreateLink text="New Room" path="/room" query={{id: "0"}} />
            <CreateLink text="Example Room" path="/room" query={{id: "1"}} />
            <CreateLink text="New Photosphere" path="/photosphere" />
        </main>
    );
};

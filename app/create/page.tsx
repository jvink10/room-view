import CreateLink from '../../components/CreateLink';

export default function Create() {
    return (
        <main>
            <CreateLink text="New Room" path="/room" query={{name: "New Room"}} />
            <CreateLink text="Example Room" path="/room" query={{name: "Example Room"}} />
            <CreateLink text="New Photosphere" path="/photosphere" />
        </main>
    );
};

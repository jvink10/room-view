import { useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

type Props = {
    updatePhotosphereFile: Function;
};

export default function PhotosphereInput(props: Props) {
    const photosphereFileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotosphereFileClick = () => {
        photosphereFileInputRef.current?.click();
    };

    const updatePhotosphereFile = (event: { target: { files: any; }; }) => {
        if (event.target.files && event.target.files[0]) {
            const photosphere = event.target.files[0];
            const photosphereUrl = URL.createObjectURL(photosphere);
            props.updatePhotosphereFile(photosphereUrl);
        };
    };

    return (
        <div>
            <input type="file" accept="image/*" ref={photosphereFileInputRef} onChange={updatePhotosphereFile} className="hidden" />
            <button onClick={handlePhotosphereFileClick}>
                <p className="inline">Add A Photosphere</p>
                <AiOutlinePlus className="inline" />
            </button>
        </div>
    );
};
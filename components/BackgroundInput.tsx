import { useRef } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

type Props = {
    updateBackgroundFile: Function;
};

export default function BackgroundInput(props: Props) {
    const backgroundFileInputRef = useRef<HTMLInputElement>(null);

    const handleBackgroundFileClick = () => {
        backgroundFileInputRef.current?.click();
    };

    const updateBackgroundFile = (event: { target: { files: any; }; }) => {
        if (event.target.files && event.target.files[0]) {
            const background = event.target.files[0];
            const backgroundUrl = URL.createObjectURL(background);
            props.updateBackgroundFile(backgroundUrl);
        };
    };

    return (
        <div>
            <input type="file" accept="image/*" ref={backgroundFileInputRef} onChange={updateBackgroundFile} className="hidden" />
            <button onClick={handleBackgroundFileClick}>
                <p className="inline">Add A Background</p>
                <AiOutlinePlus className="inline" />
            </button>
        </div>
    );
};
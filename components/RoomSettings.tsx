type Props = {
    isPinging: boolean;
    visibleColors: Array<{ color: string; visible: boolean }>;
    updatePinging: Function;
    updateColorVisibility: Function;
};

export default function RoomSettings(props: Props) {
    const updatePinging = (event: { target: { checked: boolean; }; }) => {
        const pinging = event.target.checked;
        props.updatePinging(pinging);
    };

    const updateColorVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
        const color = event.currentTarget.name;
        props.updateColorVisibility(color);
    };

    return (
        <div className="border-t border-gray-100 py-8 px-4 space-y-4">
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={props.isPinging} onChange={updatePinging} className="sr-only" />
                <div className={`relative border-2 rounded-full border-photosphere-gray h-4 w-4 -top-0.5 -left-0.5 bg-white`}></div>
                <div className={`${props.isPinging ? "" : "hidden"} absolute rounded-full h-4 w-4 -top-px -left-0.5 bg-photosphere-gray animate-ping`}></div>
                <span className="ml-3 text-sm font-medium">Photosphere Pinging</span>
            </label>
            <div className="flex flex-row justify-around">
                <button name="gray" onClick={updateColorVisibility} className={`rounded-full h-4 w-4 bg-photosphere-gray ${props.visibleColors[0].visible ? "" : "opacity-25"}`}></button>
                <button name="green" onClick={updateColorVisibility} className={`rounded-full h-4 w-4 bg-photosphere-green ${props.visibleColors[1].visible ? "" : "opacity-25"}`}></button>
                <button name="blue" onClick={updateColorVisibility} className={`rounded-full h-4 w-4 bg-photosphere-blue ${props.visibleColors[2].visible ? "" : "opacity-25"}`}></button>
                <button name="yellow" onClick={updateColorVisibility} className={`rounded-full h-4 w-4 bg-photosphere-yellow ${props.visibleColors[3].visible ? "" : "opacity-25"}`}></button>
            </div>
        </div>
    );
};
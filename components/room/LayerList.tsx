type Props = {
    updateLayer: Function;
    updateLayerVisibility: Function;
    removeLayer: Function;
    backgrounds: Array<{ id: number; name: string; image: string; height: number; width: number; visible: boolean }>;
};

export default function LayerList(props: Props) {
    const updateLayer = (id: number, name: string) => {
        const nameRegex = /^.{0,15}$/;
        if (nameRegex.test(name)) {
            props.updateLayer(id, name);
        };
    };

    const updateLayerVisibility = (id: number) => {
        props.updateLayerVisibility(id);
    };

    const removeLayer = (id: number) => {
        props.removeLayer(id);
    };

    return (
        <ul>
            {props.backgrounds.map((background) => (
                <li key={background.id} className="flex flex-row justify-between group">
                    <input type="text" value={background.name} onChange={(event) => updateLayer(background.id, event.target.value)} size={10} className={`${background.visible ? "" : "text-black/25"}`} />
                    <div className="flex flex-row gap-2">
                        <button onClick={() => updateLayerVisibility(background.id)} className="hidden group-hover:inline-block">{background.visible ? "" : "Show"}</button>
                        <button onClick={() => removeLayer(background.id)} className="hidden group-hover:inline-block">Remove</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

type Props = {
    photosphere: { id: number; name: string; image: string; topPos: number; leftPos: number; color?: string };
    updatePhotosphere: Function;
    removePhotosphere: Function;
};

export default function PhotoSphereListItem(props: Props) {
    const handleUpdateName = (event: { target: { name: string; value: string } } ) => {
        const { name, value } = event.target;

        const nameRegex = /^.{0,25}$/;
        if (nameRegex.test(value)) {
            const newPhotosphere = {...props.photosphere, [name]: value};
            props.updatePhotosphere(newPhotosphere);
        };
    };

    const handleUpdateColor = (event: React.MouseEvent<HTMLButtonElement>) => {
        const name = "bg-photosphere-" + event.currentTarget.name;
        const newPhotosphere = {...props.photosphere, color: name};
        props.updatePhotosphere(newPhotosphere);
    };

    const handleUpdatePos = (event: { target: { name: string; value: number | string } } ) => {
        const { name, value } = event.target;

        const posRegex = /^(100|\d{0,2})$/;
        if (posRegex.test(String(value))) {
            const newPhotosphere = {...props.photosphere, [name]: value};
            props.updatePhotosphere(newPhotosphere);
        };
    };

    const handleRemove = () => {
        const id = props.photosphere.id;
        props.removePhotosphere(id);
    };

    return (
        <li className="group border-t border-gray-100 py-2 px-4">
            <div className="space-y-1">
                <div className="flex flex-row justify-center gap-2">
                    <input type="text" name="name" value={props.photosphere.name} onChange={handleUpdateName} className="text-center" />
                    <div className="relative group/color my-auto">
                        <div className={`border-2 rounded-full border-white h-4 w-4 ${props.photosphere.color ? props.photosphere.color : "bg-photosphere-gray"}`}></div>
                        <div className="absolute hidden group-hover/color:grid gap-1 grid-cols-2 grid-rows-2 p-1 w-max right-0 bg-gray-100">
                            <button name="gray" onClick={handleUpdateColor} className="h-4 w-4 bg-photosphere-gray"></button>
                            <button name="green" onClick={handleUpdateColor} className="h-4 w-4 bg-photosphere-green"></button>
                            <button name="blue" onClick={handleUpdateColor} className="h-4 w-4 bg-photosphere-blue"></button>
                            <button name="yellow" onClick={handleUpdateColor} className="h-4 w-4 bg-photosphere-yellow"></button>
                        </div>
                    </div>
                </div>
                <div className="hidden group-hover:block text-center">
                    <div className="flex flex-col lg:flex-row justify-evenly">
                        <div className="basis-1/2">
                            <p>Vertical Position</p>
                            <input type="number" name="topPos" value={props.photosphere.topPos} onChange={handleUpdatePos} className="w-16 text-center" />
                        </div>
                        <div className="basis-1/2">
                            <p>Horizontal Position</p>
                            <input type="number" name="leftPos" value={props.photosphere.leftPos} onChange={handleUpdatePos} className="w-16 text-center" />
                        </div>
                    </div>
                    <div>
                        <button onClick={handleRemove}>Remove</button>
                    </div>
                </div>
            </div>
        </li>
    );
};

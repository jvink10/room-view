type Props = {
    photosphere: { id: number; name: string; image: string; topPos: string; leftPos: string; color?: string };
    updatePhotosphere: Function;
    removePhotosphere: Function;
};

export default function PhotoSphereListItem(props: Props) {
    const handleUpdate = (event: { target: { name: string; value: string } } ) => {
        const { name, value } = event.target;
        const newPhotosphere = {...props.photosphere, [name]: value};
        props.updatePhotosphere(newPhotosphere);
    };

    const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
        const id = props.photosphere.id;
        props.removePhotosphere(id);
    };

    return (
        <li className="group border-t border-gray-100 py-2">
            <div className="space-y-1">
                <div className="flex flex-row justify-center gap-2">
                    <input type="text" name="name" value={props.photosphere.name} onChange={handleUpdate} className="text-center" />
                    <div className={`my-auto border-2 rounded-full border-white h-4 w-4 ${props.photosphere.color ? props.photosphere.color : "bg-gray-400"}`}></div>
                </div>
                <div className="hidden group-hover:block text-center">
                    <div className="flex flex-col lg:flex-row justify-evenly">
                        <div className="basis-1/2">
                            <p>Vertical Position</p>
                            <input type="text" name="topPos" value={props.photosphere.topPos} onChange={handleUpdate} className="w-16 text-center" />
                        </div>
                        <div className="basis-1/2">
                            <p>Horizontal Position</p>
                            <input type="text" name="leftPos" value={props.photosphere.leftPos} onChange={handleUpdate} className="w-16 text-center" />
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

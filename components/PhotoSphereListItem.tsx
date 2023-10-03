type Props = {
    photosphere: { id: number; name: string; image: string; topPos: number; leftPos: number; color: string; visible: boolean; groups: Array<{ group: number; subGroup: number }> };
    groups: Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>;
    updatePhotosphereName: Function;
    updatePhotosphereColor: Function;
    updatePhotospherePosition: Function;
    updatePhotosphereGroup: Function;
    removePhotosphere: Function;
};

export default function PhotoSphereListItem(props: Props) {
    const updatePhotosphereName = (event: { target: { value: string } } ) => {
        const name = event.target.value;

        const nameRegex = /^.{0,25}$/;
        if (nameRegex.test(name)) {
            props.updatePhotosphereName(props.photosphere.id, name);
        };
    };

    const updatePhotosphereColor = (event: React.MouseEvent<HTMLButtonElement>) => {
        const color = event.currentTarget.name;

        props.updatePhotosphereColor(props.photosphere.id, color);
    };

    const updatePhotospherePosition = (event: { target: { name: string; value: number | string } } ) => {
        const { name, value } = event.target;

        const posRegex = /^(100|\d{0,2})$/;
        if (posRegex.test(String(value))) {
            props.updatePhotospherePosition(props.photosphere.id, name, value);
        };
    };

    const updateGroup = (event: { target: { name: string, value: string } }) => {
        const groupId = Number(event.target.name);
        const subGroupId = Number(event.target.value);

        props.updatePhotosphereGroup(props.photosphere.id, groupId, subGroupId);
    };

    const removePhotosphere = () => {
        const { id, name } = props.photosphere;
        props.removePhotosphere(id, name);
    };

    return (
        <li className={`${props.photosphere.visible ? "" : "hidden"} group border-t border-gray-100 py-2 px-4`}>
            <div className="space-y-1">
                <div className="flex flex-row justify-center gap-2">
                    <input type="text" value={props.photosphere.name} onChange={updatePhotosphereName} className="text-center" />
                    <div className="relative group/color my-auto">
                        <div className={`border-2 rounded-full border-white h-4 w-4 bg-photosphere-${props.photosphere.color}`}></div>
                        <div className="absolute hidden group-hover/color:grid gap-1 grid-cols-2 grid-rows-2 p-1 w-max right-0 bg-gray-100">
                            <button name="gray" onClick={updatePhotosphereColor} className="h-4 w-4 bg-photosphere-gray"></button>
                            <button name="green" onClick={updatePhotosphereColor} className="h-4 w-4 bg-photosphere-green"></button>
                            <button name="blue" onClick={updatePhotosphereColor} className="h-4 w-4 bg-photosphere-blue"></button>
                            <button name="yellow" onClick={updatePhotosphereColor} className="h-4 w-4 bg-photosphere-yellow"></button>
                        </div>
                    </div>
                </div>
                <div className="hidden group-hover:block text-center">
                    <div className="flex flex-col lg:flex-row justify-evenly">
                        <div className="basis-1/2">
                            <p>Vertical Position</p>
                            <input type="number" name="topPos" value={props.photosphere.topPos} onChange={updatePhotospherePosition} className="w-16 text-center" />
                        </div>
                        <div className="basis-1/2">
                            <p>Horizontal Position</p>
                            <input type="number" name="leftPos" value={props.photosphere.leftPos} onChange={updatePhotospherePosition} className="w-16 text-center" />
                        </div>
                    </div>
                    <div>
                        {props.groups.map((group) => (
                            <label key={group.id}>
                                <span>{group.name}</span>
                                <select name={String(group.id)} onChange={updateGroup}>
                                    {group.subGroups.map((subGroup) => (
                                        <option key={subGroup.id} value={subGroup.id}>{subGroup.name}</option>
                                    ))}
                                </select>
                            </label>
                        ))}
                    </div>
                    <div>
                        <button onClick={removePhotosphere}>Remove</button>
                    </div>
                </div>
            </div>
        </li>
    );
};

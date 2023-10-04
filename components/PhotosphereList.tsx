type Props = {
    photospheres: Array<{ id: number; name: string; image: string; topPos: number; leftPos: number; color: string; visible: boolean; groups: Array<{ group: number; subGroup: number }> }>;
    groups: Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>;
    updatePhotosphere: Function;
    removePhotosphere: Function;
};

export default function PhotosphereList(props: Props) {
    const updatePhotosphereName = (photosphereId: number, event: { target: { value: string } } ) => {
        const name = event.target.value;

        const nameRegex = /^.{0,25}$/;
        if (nameRegex.test(name)) {
            props.updatePhotosphere(photosphereId, "name", name, false);
        };
    };

    const updatePhotosphereColor = (photosphereId: number, event: React.MouseEvent<HTMLButtonElement>) => {
        const color = event.currentTarget.name;

        props.updatePhotosphere(photosphereId, "color", color, true);
    };

    const updatePhotospherePosition = (photosphereId: number, event: { target: { name: string; value: number | string } } ) => {
        const { name, value } = event.target;

        const posRegex = /^(100|\d{0,2})$/;
        if (posRegex.test(String(value))) {
            props.updatePhotosphere(photosphereId, name, value, false);
        };
    };

    const updateGroup = (photosphereId: number, event: { target: { name: string, value: string } }) => {
        const groupId = Number(event.target.name);
        const subGroupId = Number(event.target.value);

        const photosphereIndex = props.photospheres.findIndex(photosphere => photosphere.id === photosphereId);

        const photosphere = {...props.photospheres[photosphereIndex]};

        const updatedGroups = [...photosphere.groups];

        const groupIndex = updatedGroups.findIndex(group => group.group == groupId);

        const updatedGroup = {...updatedGroups[groupIndex]};

        updatedGroup.subGroup = subGroupId;
        updatedGroups[groupIndex] = updatedGroup;
        
        props.updatePhotosphere(photosphereId, "groups", updatedGroups, true);
    };

    const removePhotosphere = (photosphereId: number, name: string) => {
        props.removePhotosphere(photosphereId, name);
    };

    return (
        <ul>
            {props.photospheres.map((photosphere) => (
                <li key={photosphere.id} className={`${photosphere.visible ? "" : "hidden"} group border-t border-gray-100 py-2 px-4`}>
                    <div className="space-y-1">
                        <div className="flex flex-row justify-center gap-2">
                            <input type="text" value={photosphere.name} onChange={(event) => updatePhotosphereName(photosphere.id, event)} className="text-center" />
                            <div className="relative group/color my-auto">
                                <div className={`border-2 rounded-full border-white h-4 w-4 bg-photosphere-${photosphere.color}`}></div>
                                <div className="absolute hidden group-hover/color:grid gap-1 grid-cols-2 grid-rows-2 p-1 w-max right-0 bg-gray-100">
                                    <button name="gray" onClick={(event) => updatePhotosphereColor(photosphere.id, event)} className="h-4 w-4 bg-photosphere-gray"></button>
                                    <button name="green" onClick={(event) => updatePhotosphereColor(photosphere.id, event)} className="h-4 w-4 bg-photosphere-green"></button>
                                    <button name="blue" onClick={(event) => updatePhotosphereColor(photosphere.id, event)} className="h-4 w-4 bg-photosphere-blue"></button>
                                    <button name="yellow" onClick={(event) => updatePhotosphereColor(photosphere.id, event)} className="h-4 w-4 bg-photosphere-yellow"></button>
                                </div>
                            </div>
                        </div>
                        <div className="hidden group-hover:block text-center">
                            <div className="flex flex-col lg:flex-row justify-evenly">
                                <div className="basis-1/2">
                                    <p>Vertical Position</p>
                                    <input type="number" name="topPos" value={photosphere.topPos} onChange={(event) => updatePhotospherePosition(photosphere.id, event)} className="w-16 text-center" />
                                </div>
                                <div className="basis-1/2">
                                    <p>Horizontal Position</p>
                                    <input type="number" name="leftPos" value={photosphere.leftPos} onChange={(event) => updatePhotospherePosition(photosphere.id, event)} className="w-16 text-center" />
                                </div>
                            </div>
                            <div>
                                {props.groups.map((group) => (
                                    <label key={group.id}>
                                        <span>{group.name}</span>
                                        <select name={String(group.id)} onChange={(event) => updateGroup(photosphere.id, event)}>
                                            {group.subGroups.map((subGroup) => (
                                                <option key={subGroup.id} value={subGroup.id}>{subGroup.name}</option>
                                            ))}
                                        </select>
                                    </label>
                                ))}
                            </div>
                            <div>
                                <button onClick={() => removePhotosphere(photosphere.id, photosphere.name)}>Remove</button>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

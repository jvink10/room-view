type Props = {
    groups: Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>;
    updateGroupVisibility: Function;
    newGroup: Function;
    removeGroup: Function;
    updateGroup: Function;
    newSubGroup: Function;
    removeSubGroup: Function;
    updateSubGroup: Function;
};

export default function GroupList(props: Props) {
    const toggleGroupVisibility = (groupId: number, subGroupId: number) => {
        props.updateGroupVisibility(groupId, subGroupId);
    };

    const newGroup = () => {
        props.newGroup();
    };

    const removeGroup = (groupId: number) => {
        props.removeGroup(groupId);
    };

    const updateGroup = (groupId: number, name: string ) => {
        const nameRegex = /^.{0,15}$/;
        if (nameRegex.test(name)) {
            props.updateGroup(groupId, name);
        };
    };

    const newSubGroup = (groupId: number) => {
        props.newSubGroup(groupId);
    };

    const removeSubGroup = (groupId: number, subGroupId: number) => {
        props.removeSubGroup(groupId, subGroupId);
    };

    const updateSubGroup = (groupId: number, subGroupId: number, name: string) => {
        const nameRegex = /^.{0,15}$/;
        if (nameRegex.test(name)) {
            props.updateSubGroup(groupId, subGroupId, name);
        };
    };

    return (
        <div>
            {props.groups.map((group) => (
                <div key={group.id}>
                    <div className="flex flex-row justify-between group border-y border-white hover:border-gray-100">
                        <input type="text" value={group.name} onChange={(event) => updateGroup(group.id, event.target.value)} size={10} />
                        <button onClick={() => removeGroup(group.id)} className="hidden group-hover:inline-block">Remove</button>
                    </div>
                    {group.subGroups.map((subGroup) => (
                        <div key={subGroup.id} className="flex flex-row justify-between group border-y border-white hover:border-gray-100">
                            <input type="text" value={subGroup.name} onChange={(event) => updateSubGroup(group.id, subGroup.id, event.target.value)} size={10} className={`${subGroup.visible ? "" : "text-black/25"}`} />
                            <div className="flex flex-row gap-2">
                                <button onClick={() => toggleGroupVisibility(group.id, subGroup.id)} className="hidden group-hover:inline-block">{subGroup.visible ? "Hide" : "Show"}</button>
                                <button onClick={() => removeSubGroup(group.id, subGroup.id)} className="hidden group-hover:inline-block">Remove</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => newSubGroup(group.id)} className="text-xs text-black/50">Sub Group +</button>
                </div>
            ))}
            <button onClick={newGroup} className="text-sm text-black/50">Group +</button>
        </div>
    );
};

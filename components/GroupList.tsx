type Props = {
    groups: Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>;
    updateGroupVisibility: Function;
    newGroup: Function;
    removeGroup: Function;
    newSubGroup: Function;
    removeSubGroup: Function;
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

    const newSubGroup = (groupId: number) => {
        props.newSubGroup(groupId);
    };

    const removeSubGroup = (groupId: number, subGroupId: number) => {
        props.removeSubGroup(groupId, subGroupId);
    };

    return (
        <div>
            {props.groups.map((group) => (
                <div key={group.id}>
                    <div className="flex flex-row justify-between group border-y border-white hover:border-gray-100">
                        <h3>{group.name}</h3>
                        <button onClick={() => removeGroup(group.id)} className="hidden group-hover:inline-block">Remove</button>
                    </div>
                    {group.subGroups.map((subGroup) => (
                        <div key={subGroup.id} className="flex flex-row justify-between group border-y border-white hover:border-gray-100">
                            <button onClick={() => toggleGroupVisibility(group.id, subGroup.id)} className={`${subGroup.visible ? "" : "text-black/25"}`}>{subGroup.name}</button>
                            <button onClick={() => removeSubGroup(group.id, subGroup.id)} className="hidden group-hover:inline-block">Remove</button>
                        </div>
                    ))}
                    <button onClick={() => newSubGroup(group.id)} className="text-xs text-black/50">Sub Group +</button>
                </div>
            ))}
            <button onClick={newGroup} className="text-sm text-black/50">Group +</button>
        </div>
    );
};

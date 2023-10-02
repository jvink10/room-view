type Props = {
    groups: Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>;
    updateGroupVisibility: Function;
    newSubGroup: Function;
    newGroup: Function;
};

export default function GroupListItem(props: Props) {
    const toggleGroupVisibility = (groupId: number, subGroupId: number) => {
        props.updateGroupVisibility(groupId, subGroupId);
    };

    const newSubGroup = (groupId: number) => {
        props.newSubGroup(groupId);
    };

    const newGroup = () => {
        props.newGroup();
    };

    return (
        <div>
            {props.groups.map((group) => (
                <div key={group.id}>
                    <h3>{group.name}</h3>
                    {group.subGroups.map((subGroup) => (
                        <div key={subGroup.id}>
                            <button onClick={() => toggleGroupVisibility(group.id, subGroup.id)} className={`${subGroup.visible ? "" : "text-black/25"}`}>{subGroup.name}</button>
                        </div>
                    ))}
                    <button onClick={() => newSubGroup(group.id)} className="text-xs text-black/50">Sub Group +</button>
                </div>
            ))}
            <button onClick={newGroup} className="text-sm text-black/50">Group +</button>
        </div>
    );
};

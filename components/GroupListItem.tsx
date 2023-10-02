type Props = {
    groups: Array<{ name: string; subGroups: Array<{ name: string; visible: boolean }> }>;
    updateGroupVisibility: Function;
    newSubGroup: Function;
    newGroup: Function;
};

export default function GroupListItem(props: Props) {
    const toggleGroupVisibility = (groupName: string, subGroupName: string) => {
        props.updateGroupVisibility(groupName, subGroupName);
    };

    const newSubGroup = (groupName: string) => {
        props.newSubGroup(groupName);
    };

    const newGroup = () => {
        props.newGroup();
    };

    return (
        <div>
            {props.groups.map((group, groupIndex) => (
                <div>
                    <h3 key={groupIndex}>{group.name}</h3>
                    {group.subGroups.map((subGroup, subGroupIndex) => (
                        <div key={subGroupIndex}>
                            <button onClick={() => toggleGroupVisibility(group.name, subGroup.name)} className={`${subGroup.visible ? "" : "text-black/25"}`}>{subGroup.name}</button>
                        </div>
                    ))}
                    <button onClick={() => newSubGroup(group.name)} className="text-xs text-black/50">Sub Group +</button>
                </div>
            ))}
            <button onClick={newGroup} className="text-sm text-black/50">Group +</button>
        </div>
    );
};

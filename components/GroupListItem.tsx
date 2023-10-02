type Props = {
    groups: Array<{ name: string; subGroups: Array<{ name: string; visible: boolean }> }>;
    updateGroupVisibility: Function;
};

export default function GroupListItem(props: Props) {
    const toggleGroupVisibility = (groupName: string, subGroupName: string) => {
        props.updateGroupVisibility(groupName, subGroupName);
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
                    <button className="text-xs text-black/50">Sub Group +</button>
                </div>
            ))}
            <button className="text-sm text-black/50">Group +</button>
        </div>
    );
};

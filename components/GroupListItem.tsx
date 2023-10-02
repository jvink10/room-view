type Props = {
    group: { name: string; subGroups: Array<{ name: string; visible: boolean }> };
    updateGroupVisibility: Function;
};

export default function GroupListItem(props: Props) {
    const toggleGroupVisibility = (subGroupName: string) => {
        props.updateGroupVisibility(props.group.name, subGroupName);
    };

    return (
        <div>
            <h3>{props.group.name}</h3>
            {props.group.subGroups?.map((subGroup, index) => (
                <div key={index}>
                    <button onClick={() => toggleGroupVisibility(subGroup.name)} className={`${subGroup.visible ? "" : "text-black/25"}`}>{subGroup.name}</button>
                </div>
            ))}
            <button className="text-xs text-black/50">Sub Group +</button>
        </div>
    );
};

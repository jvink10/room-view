type Props = {
    index: number;
    photosphere: { image: string; topPos: string; leftPos: string; color?: string; name?: string }
}

export default function PhotoSphereListItem(props: Props) {
    return (
        <li key={props.index} className="group border-t border-gray-100 py-2">
            <div className="space-y-1">
                <div className="flex flex-row justify-center gap-2">
                    <h3>{props.photosphere.name}</h3>
                    <div className={`my-auto border-2 rounded-full border-white h-4 w-4 ${props.photosphere.color ? props.photosphere.color : "bg-gray-400"}`}></div>
                </div>
                <div className="hidden group-hover:flex flex-col lg:flex-row justify-evenly text-center">
                    <div className="basis-1/2">
                        <p>Vertical Position</p>
                        <p>{props.photosphere.topPos}</p>
                    </div>
                    <div className="basis-1/2">
                        <p>Horizontal Position</p>
                        <p>{props.photosphere.leftPos}</p>
                    </div>
                </div>
            </div>
        </li>
    );
};

type Props = {
    confirmFunction: Function;
    denyFunction: Function;
    confirmText: string;
    confirmName?: string;
};

export default function Confirm(props: Props) {
    return (
        <div>
            <div onClick={() => props.denyFunction()} className="absolute h-screen w-screen top-0 left-0 bg-black/10"></div>
            <div className="absolute mx-auto border-2 rounded-md border-gray-400 p-4 h-fit w-64 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center bg-gray-100">
                <p>{props.confirmText}</p>
                <p className="font-bold">{props.confirmName}</p>
                <div className="flex flex-row justify-around">
                    <button onClick={() => props.confirmFunction()}>Yes</button>
                    <button onClick={() => props.denyFunction()}>no</button>
                </div>
            </div>
        </div>
    );
};

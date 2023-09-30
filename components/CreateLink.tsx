import Link from 'next/link';
import { AiOutlinePlus } from 'react-icons/ai';

type Props = {
    text: string;
    path: string;
    query?: {};
};

export default function CreateLink(props: Props) {
    return (
        <Link href={{pathname: props.path, query: props.query}} className="flex flex-row items-center my-16 mx-auto border-2 rounded-xl border-gray-100 p-8 h-48 w-2/3 max-w-2xl space-x-4 text-gray-400">
            <h2 className="text-xl">{props.text}</h2>
            <AiOutlinePlus size={60} />
        </Link>
    );
};

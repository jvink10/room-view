import Link from 'next/link';
import { AiOutlinePlus } from 'react-icons/ai';

export default function Create() {
    return (
        <main>
            <Link href={{pathname: "/room", query: {name: "New Room"}}} className="flex flex-row items-center my-16 mx-auto border-2 rounded-xl border-gray-100 p-8 h-48 w-2/3 max-w-2xl space-x-4 text-gray-400">
                <h2 className="text-xl">New Room</h2>
                <AiOutlinePlus size={60} />
            </Link>
            <Link href={{pathname: "/room", query: {name: "Example Room"}}} className="flex flex-row items-center my-16 mx-auto border-2 rounded-xl border-gray-100 p-8 h-48 w-2/3 max-w-2xl space-x-4 text-gray-400">
                <h2 className="text-xl">Example Room</h2>
            </Link>
            <Link href="/photosphere" className="flex flex-row items-center my-16 mx-auto border-2 rounded-xl border-gray-100 p-8 h-48 w-2/3 max-w-2xl space-x-4 text-gray-400">
                <h2 className="text-xl">New Photosphere</h2>
                <AiOutlinePlus size={60} />
            </Link>
        </main>
    );
};

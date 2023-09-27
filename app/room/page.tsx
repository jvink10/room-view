'use client'
import Link from 'next/link';
import Room from '../../components/Room';
import { useState, useRef } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

export default function RoomPage() {
    const [photospheres, setPhotospheres] = useState<Array<{ image: string; topPos: string; leftPos: string; color?: string; name?: string }>>([
        {image: "/bardon-esplanade-park.jpg", topPos: "75%", leftPos: "20%", color: "bg-green-500", name: "Bardon Esplanade Park"},
        {image: "/bardon-park-bridge.jpg", topPos: "68%", leftPos: "68%", color: "bg-blue-400", name: "Bardon Park Bridge"},
        {image: "/bowman-park.jpg", topPos: "93%", leftPos: "53%", color: "bg-green-500", name: "Bowman Park"},
        {image: "/dawn-street-park.jpg", topPos: "30%", leftPos: "58%", name: "Dawn Street Park"},
        {image: "/glen-harding-park.jpg", topPos: "20%", leftPos: "58%", name: "Glen Harding Park"},
        {image: "/lions-park.jpg", topPos: "10%", leftPos: "80%", name: "Lions Park"},
        {image: "/lions-park-parking.jpg", topPos: "22%", leftPos: "67%", name: "Lions Park Parking"},
        {image: "/st-josephs-lunch-area.jpg", topPos: "86%", leftPos: "66%", color: "bg-yellow-400", name: "St. Josephs Lunch Area"}
    ]);

    const backgroundFileInput = useRef<HTMLInputElement>(null);

    const handleBackgroundFileChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const background = event.target.files[0];
            const body = new FormData();
            body.append("image", background);
        };
    };

    const handleBackgroundFileClick = (event: any) => {
        backgroundFileInput.current?.click();
    };

    return (
        <main className="flex flex-row">
            <section className="border-r border-gray-100 w-96 max-w-1/3">
                <Link href="/create" className="block m-2 border-2 rounded-full border-black py-1 px-2 w-fit">
                    <span><AiOutlineArrowLeft className="inline" /> Back To Create</span>
                </Link>
                <h2 className="pb-2 px-4 text-xl">Background</h2>
                <div className="border-t border-gray-100 py-4">
                    <input type="file" accept="image/*" ref={backgroundFileInput} onChange={handleBackgroundFileChange} className="hidden" />
                    <button onClick={handleBackgroundFileClick}>
                        <p className="inline">Add A Background</p>
                        <AiOutlinePlus className="inline" />
                    </button>
                </div>
            </section>
            <section className="m-8">
                <Room
					image="/background.png"
					height={849}
					width={985}
					photoSphere={photospheres}
				/>
            </section>
            <section className="border-l border-gray-100 w-96 max-w-1/3 text-center">
                <Link href="/photosphere" className="block m-2 ml-auto border-2 rounded-full border-black py-1 px-2 w-fit">
                    <span>Go To Photospheres <AiOutlineArrowRight className="inline" /></span>
                </Link>
                <h2 className="pb-2 px-4 text-xl text-right">Photospheres</h2>
                <div className="border-t border-gray-100 py-4">
                    <p className="inline">Add A Photosphere</p>
                    <AiOutlinePlus className="inline" />
                </div>
                <ul>
                    {photospheres.map((photosphere, index: number) => (
                        <li key={index} className="border-t border-gray-100 py-2">
                            <div className="space-y-1">
                                <h3>{photosphere.name}</h3>
                                <div className="flex flex-col lg:flex-row justify-evenly text-center">
                                    <div className="basis-1/2">
                                        <p>Vertical Position</p>
                                        <p>{photosphere.topPos}</p>
                                    </div>
                                    <div className="basis-1/2">
                                        <p>Horizontal Position</p>
                                        <p>{photosphere.leftPos}</p>
                                    </div>
                                </div>
                                {photosphere.color ? 
                                    <div>
                                        <p>Color</p>
                                        <p>{photosphere.color}</p>
                                    </div>    
                                : null}
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

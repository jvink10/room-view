'use client'
import Link from 'next/link';
import Room from '../../components/Room';
import PhotoSphereListItem from '../../components/PhotoSphereListItem';
import { useState, useRef } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

import { emptyRoom, exampleRoom } from '../../data/room-data';

export default function RoomPage() {
    const [background, setBackground] = useState<{ id: number; name: string; image: string; height: number; width: number }>({
        id: 2, name: "Example Room", image: "/background.png", height: 1000, width: 1000,
    });

    const [photospheres, setPhotospheres] = useState<Array<{ id: number; name: string; image: string; topPos: string; leftPos: string; color?: string; }>>([
        {id: 1, name: "Bardon Esplanade Park", image: "/bardon-esplanade-park.jpg", topPos: "75%", leftPos: "20%", color: "bg-green-500"},
        {id: 2, name: "Bardon Park Bridge", image: "/bardon-park-bridge.jpg", topPos: "68%", leftPos: "68%", color: "bg-blue-400"},
        {id: 3, name: "Bowman Park", image: "/bowman-park.jpg", topPos: "93%", leftPos: "53%", color: "bg-green-500"},
        {id: 4, name: "Dawn Street Park", image: "/dawn-street-park.jpg", topPos: "30%", leftPos: "58%"},
        {id: 5, name: "Glen Harding Park", image: "/glen-harding-park.jpg", topPos: "20%", leftPos: "58%"},
        {id: 6, name: "Lions Park", image: "/lions-park.jpg", topPos: "10%", leftPos: "80%"},
        {id: 7, name: "Lions Park Parking", image: "/lions-park-parking.jpg", topPos: "22%", leftPos: "67%"},
        {id: 8, name: "St. Josephs Lunch Area", image: "/st-josephs-lunch-area.jpg", topPos: "86%", leftPos: "66%", color: "bg-yellow-400"},
    ]);

    const backgroundFileInput = useRef<HTMLInputElement>(null);

    const handleBackgroundFileChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const background = event.target.files[0];
            const backgroundUrl = URL.createObjectURL(background);
            setBackground(prevBackground => ({
                ...prevBackground,
                image: backgroundUrl
            }));
        };
    };

    const handleBackgroundFileClick = (event: any) => {
        backgroundFileInput.current?.click();
    };

    return (
        <main className="flex flex-row">
            <section className="border-r border-gray-100 w-96 max-w-1/3 text-center">
                <Link href="/create" className="block m-2 border-2 rounded-full border-black py-1 px-2 w-fit">
                    <span><AiOutlineArrowLeft className="inline" /> Back To Create</span>
                </Link>
                <h2 className="pb-2 px-4 text-xl text-left">Background</h2>
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
                    id={background.id}
                    name={background.name}
					image={background.image}
					height={background.height}
					width={background.width}
					photosphere={photospheres}
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
                        <PhotoSphereListItem key={index} photosphere={photosphere} />
                    ))}
                </ul>
            </section>
        </main>
    );
};

'use client'
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Room from '../../components/Room';
import PhotoSphereListItem from '../../components/PhotoSphereListItem';
import { useState, useEffect, useRef } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';

import { newRoom, exampleRoom } from '../../data/room-data';

export default function RoomPage() {
    const [background, setBackground] = useState<{ id: number; name: string; image: string; height: number; width: number }>({
        id: 1, name: "New Room", image: "/white-background.png", height: 1000, width: 1000,
    });

    const [photospheres, setPhotospheres] = useState<Array<{ id: number; name: string; image: string; topPos: string; leftPos: string; color?: string; }>>([]);

    const searchParams = useSearchParams();

    useEffect(() => {
        const searchParamsName = searchParams.get('name');
        if (searchParamsName === "New Room") {
            setBackground(newRoom.background);
            setPhotospheres(newRoom.photospheres);
        } else if (searchParamsName === "Example Room") {
            setBackground(exampleRoom.background);
            setPhotospheres(exampleRoom.photospheres);
        };
    }, []);

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

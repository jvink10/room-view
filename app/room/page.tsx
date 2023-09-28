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

    useEffect(() => {
        const screenLg = window.innerWidth >= 1024;
        setIsTabVisible({roomTab: screenLg, photosphereTab: screenLg});
    }, []);

    const [isTabVisible, setIsTabVisible] = useState<{ roomTab: boolean; photosphereTab: boolean }>({roomTab: true, photosphereTab: true});
    const [isPinging, setIsPinging] = useState(true);

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

    const handleTabVisible = (tab: string, visible: boolean) => {
        setIsTabVisible(prevTabVisible => ({
            ...prevTabVisible,
            [tab]: visible,
        }));
    };

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

    const photosphereFileInput = useRef<HTMLInputElement>(null);

    const handlePhotosphereFileChange = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const photosphere = event.target.files[0];
            const photosphereUrl = URL.createObjectURL(photosphere);
            const id = photospheres.reduce((prev, current) => (prev > current.id) ? prev : current.id, -1) + 1;
            const newPhotosphere = {id: id, name: "New Photosphere", image: photosphereUrl, topPos: "50%", leftPos: "50%"};
            const newPhotospheres = [...photospheres];
            newPhotospheres.push(newPhotosphere);
            setPhotospheres(newPhotospheres);
        };
    };

    const handlePhotosphereFileClick = (event: any) => {
        photosphereFileInput.current?.click();
    };

    const updatePhotosphere = (newPhotosphere: { id: number; name: string; image: string; topPos: string; leftPos: string; color?: string; }) => {
        const id = newPhotosphere.id;
        setPhotospheres(prevPhotospheres => {
            const index = prevPhotospheres.findIndex(photosphere => photosphere.id === id);
            
            if (index === -1) {
                return prevPhotospheres;
            };

            const updatedPhotospheres = [...prevPhotospheres];
            updatedPhotospheres[index] = newPhotosphere;
            return updatedPhotospheres;
        });
    };

    const removePhotosphere = (id: number) => {
        setPhotospheres(prevPhotospheres => {
            const updatedPhotospheres = prevPhotospheres.filter(photosphere => photosphere.id !== id);
            return updatedPhotospheres;
        });
    };

    return (
        <main className="flex flex-row justify-center">
            <section className={`${isTabVisible.roomTab ? "" : "hidden"} border-r border-gray-100 w-96 max-w-1/3 text-center bg-white`}>
                <Link href="/create" className="block m-2 border-2 rounded-full border-gray-200 py-1 px-4 w-fit">
                    <span><AiOutlineArrowLeft className="inline" /> Back To Create</span>
                </Link>
                <h2 className="pb-2 px-4 text-xl text-left">Background</h2>
                <div className="border-t border-gray-100 p-4">
                    <input type="file" accept="image/*" ref={backgroundFileInput} onChange={handleBackgroundFileChange} className="hidden" />
                    <button onClick={handleBackgroundFileClick}>
                        <p className="inline">Add A Background</p>
                        <AiOutlinePlus className="inline" />
                    </button>
                </div>
                <div className="border-t border-gray-100 py-8 px-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isPinging} onChange={(event) => setIsPinging(event.target.checked)} className="sr-only peer" />
                        <div className={`relative rounded-full h-4 w-4 -top-0.5 -left-0.5 bg-gray-400 ${isPinging ? "animate-ping" : ""}`}></div>
                        <span className="ml-3 text-sm font-medium">Photosphere Pinging</span>
                    </label>
                </div>
            </section>
            <section className="relative p-8">
                <Room
                    id={background.id}
                    name={background.name}
					image={background.image}
					height={background.height}
					width={background.width}
                    ping={isPinging}
					photospheres={photospheres}
				/>
                <div onClick={() => handleTabVisible("roomTab", !isTabVisible.roomTab)} className="absolute border-t-[48px] border-t-gray-200 border-r-[48px] border-r-transparent top-0 left-0"></div>
                <div onClick={() => handleTabVisible("photosphereTab", !isTabVisible.photosphereTab)} className="absolute border-t-[48px] border-t-gray-200 border-l-[48px] border-l-transparent top-0 right-0"></div>
            </section>
            <section className={`${isTabVisible.photosphereTab ? "" : "hidden"} border-l border-gray-100 w-96 max-w-1/3 text-center bg-white`}>
                <Link href="/photosphere" className="block m-2 ml-auto border-2 rounded-full border-gray-200 py-1 px-4 w-fit">
                    <span>Go To Photospheres <AiOutlineArrowRight className="inline" /></span>
                </Link>
                <h2 className="pb-2 px-4 text-xl text-right">Photospheres</h2>
                <div className="border-t border-gray-100 py-4 px-4">
                    <input type="file" accept="image/*" ref={photosphereFileInput} onChange={handlePhotosphereFileChange} className="hidden" />
                    <button onClick={handlePhotosphereFileClick}>
                        <p className="inline">Add A Photosphere</p>
                        <AiOutlinePlus className="inline" />
                    </button>
                </div>
                <ul>
                    {photospheres.map((photosphere, index) => (
                        <PhotoSphereListItem key={index} photosphere={photosphere} updatePhotosphere={updatePhotosphere} removePhotosphere={removePhotosphere} />
                    ))}
                </ul>
            </section>
        </main>
    );
};

'use client'
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { newRoom, exampleRoom } from '../../data/room-data';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Room from '../../components/Room';
import PhotoSphereListItem from '../../components/PhotoSphereListItem';
import Confirm from '../../components/Confirm';

export default function RoomPage() {
    //Setting default Room values
    const [background, setBackground] = useState<{ id: number; name: string; image: string; height: number; width: number }>(newRoom.background);
    const [photospheres, setPhotospheres] = useState<Array<{ id: number; name: string; image: string; topPos: number; leftPos: number; visible: boolean; color: string; time: string }>>([]);
    const [groups, setGroups] = useState<Array<{ name: string; subGroups: Array<{ name: string; visible: boolean }> }>>(newRoom.groups);

    //Setting group visibility
    useEffect(() => {
        setPhotospheres(prevPhotospheres => {
            const newPhotospheres = [...prevPhotospheres];

            const colorSubGroups = groups.find(group => group.name == "Colour")?.subGroups;
            const timeSubGroups = groups.find(group => group.name == "Time")?.subGroups;

            newPhotospheres.forEach(photosphere => {
                const color = photosphere.color;
                const time = photosphere.time;

                const colorSubGroup = colorSubGroups?.find(subGroup => subGroup.name == color);
                const timeSubGroup = timeSubGroups?.find(subGroup => subGroup.name == time);

                if (colorSubGroup?.visible && timeSubGroup?.visible) {
                    photosphere.visible = true;
                } else {
                    photosphere.visible = false;
                };
            });

            return newPhotospheres;
        });
    }, [groups]);

    //Checking search parameters
    const searchParams = useSearchParams();
    useEffect(() => {
        const searchParamsName = searchParams.get("name");
        if (searchParamsName === "Example Room") {
            setBackground(exampleRoom.background);
            setPhotospheres(exampleRoom.photospheres);
            setGroups(exampleRoom.groups);
        } else {
            setBackground(newRoom.background);
            setPhotospheres(newRoom.photospheres);
            setGroups(newRoom.groups);
        };
    }, []);

    //Setting initial Room settings
    const [isTabVisible, setIsTabVisible] = useState<{ roomTab: boolean; photosphereTab: boolean }>({roomTab: true, photosphereTab: true});
    const [isPinging, setIsPinging] = useState<boolean>(true);

    const { screenHeight, screenWidth } = useWindowDimensions();
    useEffect(() => {
        if (screenWidth) {
            const screenLg = screenWidth >= 1024;
            setIsTabVisible({roomTab: screenLg, photosphereTab: screenLg});
        };
    }, [screenWidth]);

    //Change background image file
    const backgroundFileInputRef = useRef<HTMLInputElement>(null);

    const handleBackgroundFileClick = () => {
        backgroundFileInputRef.current?.click();
    };

    const handleBackgroundFileChange = (event: { target: { files: any; }; }) => {
        if (event.target.files && event.target.files[0]) {
            const background = event.target.files[0];
            const backgroundUrl = URL.createObjectURL(background);
            setBackground(prevBackground => ({
                ...prevBackground,
                image: backgroundUrl
            }));
        };
    };

    //Add a new photosphere
    const photosphereFileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotosphereFileClick = () => {
        photosphereFileInputRef.current?.click();
    };

    const handlePhotosphereFileChange = (event: { target: { files: any; }; }) => {
        if (event.target.files && event.target.files[0]) {
            const photosphere = event.target.files[0];
            const photosphereUrl = URL.createObjectURL(photosphere);
            const id = photospheres.reduce((prev, current) => (prev > current.id) ? prev : current.id, -1) + 1;
            const newPhotosphere = {id: id, name: "New Photosphere", image: photosphereUrl, topPos: 50, leftPos: 50, visible: true, color: "gray", time: "day"};
            const newPhotospheres = [...photospheres];
            newPhotospheres.push(newPhotosphere);
            setPhotospheres(newPhotospheres);
        };
    };

    //Change photosphere data
    const updatePhotosphere = (newPhotosphere: { id: number; name: string; image: string; topPos: number; leftPos: number; visible: boolean; color: string; time: string }) => {
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

    //Delete a photosphere
    const [photosphereToRemove, setPhotosphereToRemove] = useState<{id: Number; name: string} | undefined>();

    const removePhotosphere = (id: number, name: string) => {
        setPhotosphereToRemove({id: id, name: name});
    };

    const confirmRemovePhotosphere = () => {
        const id = photosphereToRemove?.id;
        setPhotospheres(prevPhotospheres => {
            const updatedPhotospheres = prevPhotospheres.filter(photosphere => photosphere.id !== id);
            return updatedPhotospheres;
        });
        setPhotosphereToRemove(undefined);
    };

    const denyRemovePhotosphere = () => {
        setPhotosphereToRemove(undefined);
    };

    //Toggle photosphere group visibility
    const toggleGroupVisibility = (groupIndex: number, subGroupIndex: number) => {
        const prevVisibility = groups[groupIndex].subGroups[subGroupIndex].visible;
        
        setGroups(prevGroups => {
            const updatedGroups = [...prevGroups];
            const updatedGroup = {...updatedGroups[groupIndex]};
            const updatedSubGroups = [...updatedGroup.subGroups];
            const updatedSubGroup = {
                ...updatedSubGroups[subGroupIndex],
                visible: !prevVisibility,
            };

            updatedSubGroups[subGroupIndex] = updatedSubGroup;
            updatedGroup.subGroups = updatedSubGroups;
            updatedGroups[groupIndex] = updatedGroup;

            return updatedGroups;
        });
    };

    //Change tab visibility
    const handleTabVisible = (tab: string, visible: boolean) => {
        setIsTabVisible({
            ...isTabVisible,
            [tab]: visible,
        });
    };

    //Change pinging state
    const handlePinging = (event: { target: { checked: boolean; }; }) => {
        const pinging = event.target.checked;
        setIsPinging(pinging);
    };

    return (
        <main className="flex flex-row justify-center">
            <section className={`${isTabVisible.roomTab ? "" : "hidden"} border-r border-gray-100 w-96 max-w-1/3 text-center bg-white`}>
                <Link href="/create" className="block m-2 border-2 rounded-full border-gray-200 py-1 px-4 w-fit">
                    <span><AiOutlineArrowLeft className="inline" /> Back To Create</span>
                </Link>
                <h2 className="pb-2 px-4 text-xl text-left">Background</h2>
                <div className="border-t border-gray-100 p-4">
                    <input type="file" accept="image/*" ref={backgroundFileInputRef} onChange={handleBackgroundFileChange} className="hidden" />
                    <button onClick={handleBackgroundFileClick}>
                        <p className="inline">Add A Background</p>
                        <AiOutlinePlus className="inline" />
                    </button>
                </div>
                <div className="border-t border-gray-100 py-8 px-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isPinging} onChange={handlePinging} className="sr-only" />
                        <div className={`relative border-2 rounded-full border-photosphere-gray h-4 w-4 -top-0.5 -left-0.5 bg-white`}></div>
                        <div className={`${isPinging ? "" : "hidden"} absolute rounded-full h-4 w-4 -top-px -left-0.5 bg-photosphere-gray animate-ping`}></div>
                        <span className="ml-3 text-sm font-medium">Photosphere Pinging</span>
                    </label>
                </div>
                <div className="border-t border-gray-100 p-8 text-left">
                    {groups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <h3>{group.name}</h3>
                            {group.subGroups?.map((subGroup, subGroupIndex) => (
                                <div key={subGroupIndex}>
                                    <button onClick={() => toggleGroupVisibility(groupIndex, subGroupIndex)} className={`${subGroup.visible ? "" : "text-black/25"}`}>{subGroup.name}</button>
                                </div>
                            ))}
                            <button className="text-xs text-black/50">Sub Group +</button>
                        </div>
                    ))}
                    <button className="text-sm text-black/50">Group +</button>
                </div>
            </section>
            <section className="relative p-8">
                <Room
                    background={background}
					photospheres={photospheres}
                    groups={groups}
                    ping={isPinging}
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
                    <input type="file" accept="image/*" ref={photosphereFileInputRef} onChange={handlePhotosphereFileChange} className="hidden" />
                    <button onClick={handlePhotosphereFileClick}>
                        <p className="inline">Add A Photosphere</p>
                        <AiOutlinePlus className="inline" />
                    </button>
                </div>
                <ul>
                    {photospheres.map((photosphere) => (
                        <PhotoSphereListItem key={photosphere.id} photosphere={photosphere} updatePhotosphere={updatePhotosphere} removePhotosphere={removePhotosphere} />
                    ))}
                </ul>
            </section>
            <div className={`${photosphereToRemove ? "" : "hidden"}`}>
                <Confirm confirmFunction={confirmRemovePhotosphere} denyFunction={denyRemovePhotosphere} confirmText="Are you sure you want to delete this photosphere?" confirmName={photosphereToRemove?.name} />
            </div>
        </main>
    );
};

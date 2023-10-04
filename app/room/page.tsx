'use client'
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { newRoom, exampleRoom } from '../../data/room-data';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import GroupList from '../../components/GroupList';
import Room from '../../components/Room';
import PhotosphereList from '../../components/PhotosphereList';
import Confirm from '../../components/Confirm';

export default function RoomPage() {
    //Setting default Room values
    const [background, setBackground] = useState<{ id: number; name: string; image: string; height: number; width: number }>(newRoom.background);
    const [photospheres, setPhotospheres] = useState<Array<{ id: number; name: string; image: string; topPos: number; leftPos: number; color: string; visible: boolean; groups: Array<{ group: number; subGroup: number }> }>>([]);
    const [groups, setGroups] = useState<Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>>(newRoom.groups);

    //Setting initial Room settings
    const [isTabVisible, setIsTabVisible] = useState<{ roomTab: boolean; photosphereTab: boolean }>({roomTab: true, photosphereTab: true});
    const [isPinging, setIsPinging] = useState<boolean>(true);
    const [visibleColors, setVisibleColors] = useState<Array<{ color: string; visible: boolean }>>([{color: "gray", visible: true}, {color: "green", visible: true}, {color: "blue", visible: true}, {color: "yellow", visible: true}]);

    const updatePhotosphereVisibility = () => {
        setPhotospheres(prevPhotospheres => {
            const updatedPhotospheres = [...prevPhotospheres];

            updatedPhotospheres.forEach(photosphere => {
                if (photosphere.groups.every(photosphereGroup => {
                    const groupIndex = groups.findIndex(group => group.id === photosphereGroup.group);

                    const group = groups[groupIndex];

                    const subGroups = group.subGroups;

                    const subGroupIndex = subGroups.findIndex(subGroup => subGroup.id === photosphereGroup.subGroup);

                    const subGroup = subGroups[subGroupIndex];

                    const visible = subGroup.visible === true;

                    return visible;
                })) {
                    const color = photosphere.color;

                    const colorIndex = visibleColors.findIndex(visibleColor => visibleColor.color === color);

                    const visibleColor = visibleColors[colorIndex];

                    if (visibleColor.visible) {
                        photosphere.visible = true;
                    } else {
                        photosphere.visible = false;
                    };                    
                } else {
                    photosphere.visible = false;
                };
            });

            return updatedPhotospheres;
        });
    };

    //Setting photosphere visibility
    useEffect(() => {
        updatePhotosphereVisibility();
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

            const id = photospheres.reduce((previous, current) => (previous > current.id) ? previous : current.id, -1) + 1;
            const newGroups: Array<{ group: number; subGroup: number }> = [];
            groups.forEach(group => {
                newGroups.push({group: 0, subGroup: 0});
            });

            const newPhotosphere = {id: id, name: "New Photosphere", image: photosphereUrl, topPos: 50, leftPos: 50, color: "gray", visible: true, groups: newGroups };
            const newPhotospheres = [...photospheres];
            newPhotospheres.push(newPhotosphere);
            setPhotospheres(newPhotospheres);
        };
    };

    //Change photosphere data
    const updatePhotosphere = (id: number, property: string, value: string | number | Array<{ group: number; subGroup: number }>, updateVisibility: boolean) => {
        setPhotospheres(prevPhotospheres => {
            const updatedPhotospheres = [...prevPhotospheres];

            const photosphereIndex = updatedPhotospheres.findIndex(photosphere => photosphere.id === id);

            const updatedPhotosphere = {...updatedPhotospheres[photosphereIndex]};

            (updatedPhotosphere as any)[property] = value;
            updatedPhotospheres[photosphereIndex] = updatedPhotosphere;

            if (updateVisibility) {
                updatePhotosphereVisibility();
            };

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
    const toggleGroupVisibility = (groupId: number, subGroupId: number) => {
        setGroups(prevGroups => {
            const updatedGroups = [...prevGroups];

            const groupIndex = updatedGroups.findIndex(group => group.id === groupId);

            const updatedGroup = {...updatedGroups[groupIndex]};

            const updatedSubGroups = [...updatedGroup.subGroups];

            const subGroupIndex = updatedSubGroups.findIndex(subGroup => subGroup.id === subGroupId);

            const prevVisibility = updatedGroups[groupIndex].subGroups[subGroupIndex].visible;

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

    const newGroup = () => {
        const newGroupId = groups.reduce((previous, current) => (previous > current.id) ? previous : current.id, -1) + 1;

        setGroups(prevGroups => {
            const updatedGroups = [...prevGroups];

            updatedGroups.push({id: newGroupId, name: "new group", subGroups: [{id: 0, name: "new sub group", visible: true}]});

            return updatedGroups;
        });
        
        setPhotospheres(prevPhotospheres => {
            const updatedPhotospheres = [...prevPhotospheres];

            updatedPhotospheres.forEach(photosphere => {
                photosphere.groups.push({group: newGroupId, subGroup: 0});
            });

            return updatedPhotospheres;
        });
    };

    const removeGroup = (groupId: number) => {
        setPhotospheres(prevPhotospheres => {
            const updatedPhotospheres = [...prevPhotospheres];

            updatedPhotospheres.forEach(photosphere => {
                const groupIndex = photosphere.groups.findIndex(photosphereGroup => photosphereGroup.group === groupId);

                photosphere.groups.splice(groupIndex, 1);
            });

            return updatedPhotospheres;
        });

        setGroups(prevGroups => {
            const updatedGroups = [...prevGroups];

            const groupIndex = updatedGroups.findIndex(group => group.id === groupId);

            updatedGroups.splice(groupIndex, 1);

            return updatedGroups;
        });
    };

    const updateGroup = (groupId: number, name: string) => {
        setGroups(prevGroups => {
            const updatedGroups = [...prevGroups];

            const groupIndex = updatedGroups.findIndex(group => group.id === groupId);

            updatedGroups[groupIndex].name = name;

            return updatedGroups;
        });
    };

    const newSubGroup = (groupId: number) => {
        setGroups(prevGroups => {
            const groupIndex = groups.findIndex(group => group.id === groupId);

            const newSubGroupId = groups[groupIndex].subGroups.reduce((previous, current) => (previous > current.id) ? previous : current.id, -1) + 1;

            const updatedGroups = [...prevGroups];
            const updatedGroup = {...updatedGroups[groupIndex]};
            const updatedSubGroups = [...updatedGroup.subGroups];

            updatedSubGroups.push({id: newSubGroupId, name: "new sub group", visible: true});

            updatedGroup.subGroups = updatedSubGroups;
            updatedGroups[groupIndex] = updatedGroup;

            return updatedGroups;
        });
    };

    const removeSubGroup = (groupId: number, subGroupId: number) => {
        const groupIndex = groups.findIndex(group => group.id === groupId);
        const subGroupIndex = groups[groupIndex].subGroups.findIndex(subGroup => subGroup.id === subGroupId)

        if (groups[groupIndex].subGroups.length <= 1) {
            return;
        };

        setPhotospheres(prevPhotospheres => {
            const updatedPhotospheres = [...prevPhotospheres];

            updatedPhotospheres.forEach(photosphere => {
                const photosphereGroupIndex = photosphere.groups.findIndex(photosphereGroup => photosphereGroup.group === groupId);

                const newSubGroupIndex = groups[groupIndex].subGroups.findIndex(subGroup => subGroup.id !== subGroupId);

                const newSubGroupId = groups[groupIndex].subGroups[newSubGroupIndex].id;

                photosphere.groups[photosphereGroupIndex].subGroup = newSubGroupId;
            });

            return updatedPhotospheres;
        });

        setGroups(prevGroups => {
            const updatedGroups = [...prevGroups];
            
            updatedGroups[groupIndex].subGroups.splice(subGroupIndex, 1);

            return updatedGroups;
        });
    };

    const updateSubGroup = (groupId: number, subGroupId: number, name: string) => {
        setGroups(prevGroups => {
            const updatedGroups = [...prevGroups];

            const groupIndex = updatedGroups.findIndex(group => group.id === groupId);

            const updatedGroup = {...updatedGroups[groupIndex]};
            const updatedSubGroups = [...updatedGroup.subGroups];

            const subGroupIndex = updatedSubGroups.findIndex(subGroup => subGroup.id === subGroupId);

            const updatedSubGroup = {...updatedSubGroups[subGroupIndex]};

            updatedSubGroup.name = name;

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

    //Update color visibility
    const updateColorVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
        const color = event.currentTarget.name;

        setVisibleColors(prevVisibleColors => {
            const updatedVisibleColors = [...prevVisibleColors];

            const visibleColorIndex = updatedVisibleColors.findIndex(visibleColor => visibleColor.color === color);

            const updatedVisibleColor = {...updatedVisibleColors[visibleColorIndex]};

            const updatedVisibility = !updatedVisibleColor.visible;

            updatedVisibleColor.visible = updatedVisibility;

            updatedVisibleColors[visibleColorIndex] = updatedVisibleColor;

            updatePhotosphereVisibility();

            return updatedVisibleColors;
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
                    <input type="file" accept="image/*" ref={backgroundFileInputRef} onChange={handleBackgroundFileChange} className="hidden" />
                    <button onClick={handleBackgroundFileClick}>
                        <p className="inline">Add A Background</p>
                        <AiOutlinePlus className="inline" />
                    </button>
                </div>
                <div className="border-t border-gray-100 py-8 px-4 space-y-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isPinging} onChange={handlePinging} className="sr-only" />
                        <div className={`relative border-2 rounded-full border-photosphere-gray h-4 w-4 -top-0.5 -left-0.5 bg-white`}></div>
                        <div className={`${isPinging ? "" : "hidden"} absolute rounded-full h-4 w-4 -top-px -left-0.5 bg-photosphere-gray animate-ping`}></div>
                        <span className="ml-3 text-sm font-medium">Photosphere Pinging</span>
                    </label>
                    <div className="flex flex-row justify-around">
                        <button name="gray" onClick={updateColorVisibility} className={`rounded-full h-4 w-4 bg-photosphere-gray ${visibleColors[0].visible ? "" : "opacity-25"}`}></button>
                        <button name="green" onClick={updateColorVisibility} className={`rounded-full h-4 w-4 bg-photosphere-green ${visibleColors[1].visible ? "" : "opacity-25"}`}></button>
                        <button name="blue" onClick={updateColorVisibility} className={`rounded-full h-4 w-4 bg-photosphere-blue ${visibleColors[2].visible ? "" : "opacity-25"}`}></button>
                        <button name="yellow" onClick={updateColorVisibility} className={`rounded-full h-4 w-4 bg-photosphere-yellow ${visibleColors[3].visible ? "" : "opacity-25"}`}></button>
                    </div>
                </div>
                <div className="border-t border-gray-100 p-8 text-left">
                    <GroupList groups={groups} updateGroupVisibility={toggleGroupVisibility} newGroup={newGroup} removeGroup={removeGroup} updateGroup={updateGroup} newSubGroup={newSubGroup} removeSubGroup={removeSubGroup} updateSubGroup={updateSubGroup} />
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
                <div>
                    <PhotosphereList photospheres={photospheres} groups={groups} updatePhotosphere={updatePhotosphere} removePhotosphere={removePhotosphere} />
                </div>
            </section>
            <div className={`${photosphereToRemove ? "" : "hidden"}`}>
                <Confirm confirmFunction={confirmRemovePhotosphere} denyFunction={denyRemovePhotosphere} confirmText="Are you sure you want to delete this photosphere?" confirmName={photosphereToRemove?.name} />
            </div>
        </main>
    );
};

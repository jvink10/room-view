'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import roomData from '../../data/room-data';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import RoomTab from '../../components/room/RoomTab';
import RoomDisplay from '../../components/room/RoomDisplay';
import PhotosphereTab from '../../components/room/PhotosphereTab';
import Confirm from '../../components/Confirm';

export default function RoomPage() {
    //Setting default Room values
    const [backgrounds, setBackgrounds] = useState<Array<{ id: number; name: string; image: string; height: number; width: number; visible: boolean }>>(roomData[0].backgrounds);
    const [photospheres, setPhotospheres] = useState<Array<{ id: number; name: string; image: string; topPos: number; leftPos: number; color: string; visible: boolean; groups: Array<{ group: number; subGroup: number }> }>>([]);
    const [groups, setGroups] = useState<Array<{ id: number; name: string; subGroups: Array<{ id: number; name: string; visible: boolean }> }>>(roomData[0].groups);

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
    }, [groups, visibleColors]);

    //Checking search parameters
    const searchParams = useSearchParams();
    useEffect(() => {
        const searchParamsId = Number(searchParams.get("id"));

        const roomIndex = roomData.findIndex(room => room.id === searchParamsId);

        if (roomIndex !== -1) {
            setBackgrounds(roomData[roomIndex].backgrounds);
            setPhotospheres(roomData[roomIndex].photospheres);
            setGroups(roomData[roomIndex].groups);
        } else {
            setBackgrounds(roomData[0].backgrounds);
            setPhotospheres(roomData[0].photospheres);
            setGroups(roomData[0].groups);
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
    const updateBackgroundFile = (image: string) => {
        const id = backgrounds.reduce((previous, current) => (previous > current.id) ? previous : current.id, -1) + 1;

        const newBackground = {id: id, name: "New Layer", image: image, height: 1000, width: 1000, visible: true };

        setBackgrounds(prevBackgrounds => {
            const updatedBackgrounds = [...prevBackgrounds];

            updatedBackgrounds.forEach(background => background.visible = false);

            updatedBackgrounds.push(newBackground);

            return updatedBackgrounds;
        });
    };

    //Update layer data
    const updateLayer = (id: number, name: string) => {
        setBackgrounds(prevBackgrounds => {
            const updatedBackgrounds = [...prevBackgrounds];

            const backgroundIndex = updatedBackgrounds.findIndex(background => background.id === id);

            updatedBackgrounds[backgroundIndex].name = name;

            return updatedBackgrounds;
        });
    };

    const updateLayerVisibility = (id: number) => {
        setBackgrounds(prevBackgrounds => {
            const updatedBackgrounds = [...prevBackgrounds];

            const backgroundIndex = updatedBackgrounds.findIndex(background => background.id === id);

            updatedBackgrounds.forEach(background => background.visible = false);
            updatedBackgrounds[backgroundIndex].visible = true;

            return updatedBackgrounds;
        });
    };

    const removeLayer = (id: number) => {
        if (backgrounds.length <= 1) {
            return;
        };

        setBackgrounds(prevBackgrounds => {
            const updatedBackgrounds = [...prevBackgrounds];

            const backgroundIndex = updatedBackgrounds.findIndex(background => background.id === id);

            updatedBackgrounds.splice(backgroundIndex, 1);

            return updatedBackgrounds;
        });
    };

    //Change pinging state
    const updatePinging = (pinging: boolean) => {
        setIsPinging(pinging);
    };

    //Update color visibility
    const updateColorVisibility = (color: string) => {
        setVisibleColors(prevVisibleColors => {
            const updatedVisibleColors = [...prevVisibleColors];

            const visibleColorIndex = updatedVisibleColors.findIndex(visibleColor => visibleColor.color === color);

            const updatedVisibleColor = {...updatedVisibleColors[visibleColorIndex]};

            const updatedVisibility = !updatedVisibleColor.visible;

            updatedVisibleColor.visible = updatedVisibility;

            updatedVisibleColors[visibleColorIndex] = updatedVisibleColor;

            return updatedVisibleColors;
        });
    };

    //Toggle photosphere group visibility
    const updateGroupVisibility = (groupId: number, subGroupId: number) => {
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

    //Add a new photosphere
    const updatePhotosphereFile = (image: string) => {
        const id = photospheres.reduce((previous, current) => (previous > current.id) ? previous : current.id, -1) + 1;
        const newGroups: Array<{ group: number; subGroup: number }> = [];
        groups.forEach(group => {
            newGroups.push({group: 0, subGroup: 0});
        });

        const newPhotosphere = {id: id, name: "New Photosphere", image: image, topPos: 50, leftPos: 50, color: "gray", visible: true, groups: newGroups };

        setPhotospheres(prevPhotospheres => {
            const newPhotospheres = [...prevPhotospheres];

            newPhotospheres.push(newPhotosphere);

            return newPhotospheres;
        });
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

    return (
        <div className="flex flex-row justify-center">
            <section className={`${isTabVisible.roomTab ? "" : "hidden"} border-r border-gray-100 w-96 max-w-1/3 text-center bg-white`}>
                <RoomTab updateBackgroundFile={updateBackgroundFile} updateLayer={updateLayer} updateLayerVisibility={updateLayerVisibility} removeLayer={removeLayer} backgrounds={backgrounds} isPinging={isPinging} visibleColors={visibleColors} updatePinging={updatePinging} updateColorVisibility={updateColorVisibility} groups={groups} updateGroupVisibility={updateGroupVisibility} newGroup={newGroup} removeGroup={removeGroup} updateGroup={updateGroup} newSubGroup={newSubGroup} removeSubGroup={removeSubGroup} updateSubGroup={updateSubGroup} />
            </section>
            <section className="relative p-8">
                <RoomDisplay
                    backgrounds={backgrounds}
					photospheres={photospheres}
                    groups={groups}
                    ping={isPinging}
				/>
                <div onClick={() => handleTabVisible("roomTab", !isTabVisible.roomTab)} className="absolute border-t-[48px] border-t-gray-200 border-r-[48px] border-r-transparent top-0 left-0"></div>
                <div onClick={() => handleTabVisible("photosphereTab", !isTabVisible.photosphereTab)} className="absolute border-t-[48px] border-t-gray-200 border-l-[48px] border-l-transparent top-0 right-0"></div>
            </section>
            <section className={`${isTabVisible.photosphereTab ? "" : "hidden"} border-l border-gray-100 w-96 max-w-1/3 text-center bg-white`}>
                <PhotosphereTab updatePhotosphereFile={updatePhotosphereFile} photospheres={photospheres} groups={groups} updatePhotosphere={updatePhotosphere} removePhotosphere={removePhotosphere} />
            </section>
            <div className={`${photosphereToRemove ? "" : "hidden"}`}>
                <Confirm confirmFunction={confirmRemovePhotosphere} denyFunction={denyRemovePhotosphere} confirmText="Are you sure you want to delete this photosphere?" confirmName={photosphereToRemove?.name} />
            </div>
        </div>
    );
};

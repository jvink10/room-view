export const newRoom = {
    background: {id: 1, name: "New Room", image: "/white-background.jpg", height: 1000, width: 1000},
    photospheres: [],
    groups: [
        {name: "Colour", subGroups: [
            {name: "gray", visible: true},
            {name: "blue", visible: true},
            {name: "green", visible: true},
            {name: "yellow", visible: true},
        ]},
        {name: "Time", subGroups: [
            {name: "day", visible: true},
            {name: "night", visible: true},
        ]},
    ],
};

export const exampleRoom = {
    background: {id: 2, name: "Example Room", image: "/background.png", height: 1000, width: 1000},
    photospheres: [
        {id: 1, name: "Bardon Esplanade Park", image: "/bardon-esplanade-park.jpg", topPos: 75, leftPos: 21, visible: true, color: "green", time: "day"},
        {id: 2, name: "Bardon Park Bridge", image: "/bardon-park-bridge.jpg", topPos: 68, leftPos: 68, visible: true, color: "blue", time: "day"},
        {id: 3, name: "Bowman Park", image: "/bowman-park.jpg", topPos: 94, leftPos: 53, visible: true, color: "green", time: "day"},
        {id: 4, name: "Dawn Street Park", image: "/dawn-street-park.jpg", topPos: 30, leftPos: 58, visible: true, color: "gray", time: "day"},
        {id: 5, name: "Glen Harding Park", image: "/glen-harding-park.jpg", topPos: 20, leftPos: 58, visible: true, color: "gray", time: "day"},
        {id: 6, name: "Lions Park", image: "/lions-park.jpg", topPos: 11, leftPos: 80, visible: true, color: "gray", time: "day"},
        {id: 7, name: "Lions Park Parking", image: "/lions-park-parking.jpg", topPos: 22, leftPos: 67, visible: true, color: "gray", time: "day"},
        {id: 8, name: "St. Josephs Lunch Area", image: "/st-josephs-lunch-area.jpg", topPos: 87, leftPos: 67, visible: true, color: "yellow", time: "day"},
    ],
    groups: [
        {name: "Colour", subGroups: [
            {name: "gray", visible: true},
            {name: "blue", visible: true},
            {name: "green", visible: true},
            {name: "yellow", visible: true},
        ]},
        {name: "Time", subGroups: [
            {name: "day", visible: true},
            {name: "night", visible: true},
        ]},
    ],
};

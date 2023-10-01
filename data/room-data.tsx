export const newRoom = {
    background: {id: 1, name: "New Room", image: "/white-background.jpg", height: 1000, width: 1000},
    photospheres: [],
    groups: [
        {name: "Colour", photosphereIds: [], subGroup: [
            {name: "gray", photosphereIds: []},
            {name: "blue", photosphereIds: []},
            {name: "green", photosphereIds: []},
            {name: "yellow", photosphereIds: []},
        ],
    }],
};

export const exampleRoom = {
    background: {id: 2, name: "Example Room", image: "/background.png", height: 1000, width: 1000},
    photospheres: [
        {id: 1, name: "Bardon Esplanade Park", image: "/bardon-esplanade-park.jpg", topPos: 75, leftPos: 21, color: "bg-photosphere-green"},
        {id: 2, name: "Bardon Park Bridge", image: "/bardon-park-bridge.jpg", topPos: 68, leftPos: 68, color: "bg-photosphere-blue"},
        {id: 3, name: "Bowman Park", image: "/bowman-park.jpg", topPos: 94, leftPos: 53, color: "bg-photosphere-green"},
        {id: 4, name: "Dawn Street Park", image: "/dawn-street-park.jpg", topPos: 30, leftPos: 58},
        {id: 5, name: "Glen Harding Park", image: "/glen-harding-park.jpg", topPos: 20, leftPos: 58},
        {id: 6, name: "Lions Park", image: "/lions-park.jpg", topPos: 11, leftPos: 80},
        {id: 7, name: "Lions Park Parking", image: "/lions-park-parking.jpg", topPos: 22, leftPos: 67},
        {id: 8, name: "St. Josephs Lunch Area", image: "/st-josephs-lunch-area.jpg", topPos: 87, leftPos: 67, color: "bg-photosphere-yellow"},
    ],
    groups: [
        {name: "Colour", photosphereIds: [1, 2, 3, 4, 5, 6, 7, 8], subGroup: [
            {name: "gray", photosphereIds: [4, 5, 6, 7]},
            {name: "blue", photosphereIds: [2]},
            {name: "green", photosphereIds: [1, 3]},
            {name: "yellow", photosphereIds: [8]},
        ],
    }],
};

const roomData = [
    {
        id: 0,
        name: "New Room",
        background: [
            {id: 0, image: "/white-background.jpg", height: 1000, width: 1000},
        ],
        photospheres: [],
        groups: [],
    },
    {
        id: 1,
        name: "Example Room",
        background: [
            {id: 0, image: "/background.png", height: 1000, width: 1000},
        ],
        photospheres: [
            {id: 0, name: "Bardon Esplanade Park", image: "/bardon-esplanade-park.jpg", topPos: 75, leftPos: 21, color: "green", visible: true, groups: []},
            {id: 1, name: "Bardon Park Bridge", image: "/bardon-park-bridge.jpg", topPos: 68, leftPos: 68, color: "blue", visible: true, groups: []},
            {id: 2, name: "Bowman Park", image: "/bowman-park.jpg", topPos: 94, leftPos: 53, color: "green", visible: true, groups: []},
            {id: 3, name: "Dawn Street Park", image: "/dawn-street-park.jpg", topPos: 30, leftPos: 58, color: "gray", visible: true, groups: []},
            {id: 4, name: "Glen Harding Park", image: "/glen-harding-park.jpg", topPos: 20, leftPos: 58, color: "gray", visible: true, groups: []},
            {id: 5, name: "Lions Park", image: "/lions-park.jpg", topPos: 11, leftPos: 80, color: "gray", visible: true, groups: []},
            {id: 6, name: "Lions Park Parking", image: "/lions-park-parking.jpg", topPos: 22, leftPos: 67, color: "gray", visible: true, groups: []},
            {id: 7, name: "St. Josephs Lunch Area", image: "/st-josephs-lunch-area.jpg", topPos: 87, leftPos: 67, color: "yellow", visible: true, groups: []},
        ],
        groups: [],
    }
];

export default roomData;

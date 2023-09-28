import Room from '../components/Room';

export default function Home() {
  	return (
    	<main>
			<section className="my-8 mx-auto border-2 border-gray-300 w-fit">
				<Room
					id={2}
					name="Example Room"
					image="/background.png"
					height={849}
					width={985}
					ping={true}
					photospheres={[
						{id: 1, name: "Bardon Esplanade Park", image: "/bardon-esplanade-park.jpg", topPos: "75%", leftPos: "20%", color: "bg-green-500"},
        				{id: 2, name: "Bardon Park Bridge", image: "/bardon-park-bridge.jpg", topPos: "68%", leftPos: "68%", color: "bg-blue-400"},
        				{id: 3, name: "Bowman Park", image: "/bowman-park.jpg", topPos: "93%", leftPos: "53%", color: "bg-green-500"},
        				{id: 4, name: "Dawn Street Park", image: "/dawn-street-park.jpg", topPos: "30%", leftPos: "58%"},
        				{id: 5, name: "Glen Harding Park", image: "/glen-harding-park.jpg", topPos: "20%", leftPos: "58%"},
        				{id: 6, name: "Lions Park", image: "/lions-park.jpg", topPos: "10%", leftPos: "80%"},
        				{id: 7, name: "Lions Park Parking", image: "/lions-park-parking.jpg", topPos: "22%", leftPos: "67%"},
        				{id: 8, name: "St. Josephs Lunch Area", image: "/st-josephs-lunch-area.jpg", topPos: "86%", leftPos: "66%", color: "bg-yellow-400"},
					]}
				/>
			</section>
			<section>
				<div className="my-8">
					<h1 className="text-2xl text-center">Room View Features</h1>
				</div>
				<div className="flex flex-row justify-between my-16 mx-auto px-8 max-w-[985px]">
					<h2 className="text-lg">View Any Room In 360 Degrees</h2>
					<p>Image of floor plan with multiple blips</p>
				</div>
				<div className="flex flex-row-reverse justify-between my-16 mx-auto px-8 max-w-[985px]">
					<h2 className="text-lg">See How A Room Has Changed Over Time</h2>
					<p>Show a single photosphere with different iterations</p>
				</div>
				<div className="flex flex-row justify-between my-16 mx-auto px-8 max-w-[985px]">
					<h2 className="text-lg">Visualise A Multistory Building</h2>
					<p>Show layers of backgrounds</p>
				</div>
			</section>
    	</main>
  	);
};

import RoomDisplay from '../components/room/RoomDisplay';
import roomData from '../data/room-data';

export default function Home() {
  	return (
    	<main>
			<section className="my-8 mx-auto border-2 border-gray-300 w-fit">
				<RoomDisplay
					backgrounds={roomData[1].backgrounds}
					photospheres={roomData[1].photospheres}
                    groups={roomData[1].groups}
                    ping={true}
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

import Room from '../components/Room';

export default function Home() {
  	return (
    	<main>
			<section className="my-8 mx-auto border-2 border-gray-300 w-fit">
				<Room image="/background.png" height={849} width={985} />
			</section>
			<section>
				<div className="my-8">
					<h1 className="text-2xl text-center">Room View Features</h1>
				</div>
				<div className="my-16 mx-auto max-w-[985px]">
					<h2 className="text-lg">View Any Room In 360 Degrees</h2>
				</div>
				<div className="my-16 mx-auto max-w-[985px]">
					<h2 className="text-lg">See How A Room Has Changed Over Time</h2>
				</div>
				<div className="my-16 mx-auto max-w-[985px]">
					<h2 className="text-lg">Visualise A Multistory Building</h2>
				</div>
			</section>
    	</main>
  	);
};

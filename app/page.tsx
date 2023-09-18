import Room from '../components/Room';

export default function Home() {
  	return (
    	<main>
			<div className="my-8 mx-auto border-2 border-gray-300 w-fit">
				<Room image="/background.png" height={849} width={985} />
			</div>
    	</main>
  	);
};

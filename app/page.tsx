import Room from '../components/Room';

export default function Home() {
  	return (
    	<main>
			<div>
				<div className="absolute">
					<Room image="/background.png" height={849} width={985} />
				</div>
			</div>
    	</main>
  	);
};

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  	title: 'Room View',
  	description: 'View a room or outdoor area through photospheres on a map',
};

export default function RootLayout({
  	children,
}: {
  	children: React.ReactNode
}) {
  	return (
    	<html lang="en">
      		<body className={`${inter.className} flex flex-col min-h-screen`}>
				<header className="border-b border-gray-100">
					<h1 className=" py-2 px-8 text-lg">Room View</h1>
				</header>
				<div className="flex-grow">
					{children}
				</div>
			</body>
    	</html>
  	);
};

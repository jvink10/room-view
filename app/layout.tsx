import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Link from 'next/link';

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
				<header className="flex flex-row justify-evenly border-b border-gray-100">
					<h1 className="py-2 text-lg">Room View</h1>
					<div className="my-auto space-x-8">
						<Link href="/">Home</Link>
						<Link href="/create">Create</Link>
					</div>
				</header>
				<div className="flex-grow">
					{children}
				</div>
			</body>
    	</html>
  	);
};

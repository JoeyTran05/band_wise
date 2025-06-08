import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const workSans = Work_Sans({
	variable: "--font-work-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "BandWise",
	description: "An AI-powered IELTS learning platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${workSans.className} antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}

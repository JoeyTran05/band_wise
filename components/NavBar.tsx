"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerClose,
} from "@/components/ui/drawer";
import { useState } from "react";

const navItems = [
	{ label: "Mock Tests", href: "/mock-tests" },
	{ label: "Learning", href: "/learning" },
	{ label: "AI", href: "/ai" },
	{ label: "Personalized", href: "/personalized" },
];

export default function NavBar() {
	const [sidebarOpen, setSidebarOpen] = useState(true);

	return (
		<>
			{/* Top NavBar */}
			<div className="flex items-center justify-between border-b p-4 pl-2 lg:pl-[calc(theme(spacing.6))] lg:ml-[--sidebar-width]">
				{/* Large screen menu */}
				<div className="flex items-center gap-2">
					<Drawer direction="left" modal={false}>
						<DrawerTrigger className="hidden lg:flex" asChild>
							<Button variant="ghost" size="icon">
								<Menu className="h-6 w-6" />
							</Button>
						</DrawerTrigger>
						<DrawerContent className="hidden lg:relative lg:top-0 lg:left-0 lg:flex">
							<div className="p-4">
								<DrawerHeader>
									<DrawerTitle>Menu</DrawerTitle>
								</DrawerHeader>
								<nav className="flex flex-col gap-4 px-4">
									{navItems.map((item) => (
										<Link
											key={item.href}
											href={item.href}
											className="text-lg font-medium"
											onClick={() =>
												setSidebarOpen(false)
											}
										>
											{item.label}
										</Link>
									))}
									<DrawerClose asChild>
										<Button
											variant="outline"
											className="mt-6"
										>
											Close
										</Button>
									</DrawerClose>
								</nav>
							</div>
						</DrawerContent>
					</Drawer>

					{/* Small screen menu */}
					<Drawer direction="bottom">
						<DrawerTrigger className="lg:hidden" asChild>
							<Button variant="ghost" size="icon">
								<Menu className="h-6 w-6" />
							</Button>
						</DrawerTrigger>
						<DrawerContent>
							<div className="p-4">
								<DrawerHeader>
									<DrawerTitle>Menu</DrawerTitle>
								</DrawerHeader>
								<nav className="flex flex-col gap-4 px-4">
									{navItems.map((item) => (
										<Link
											key={item.href}
											href={item.href}
											className="text-lg font-medium"
											onClick={() =>
												setSidebarOpen(false)
											}
										>
											{item.label}
										</Link>
									))}
									<DrawerClose asChild>
										<Button
											variant="outline"
											className="mt-6"
										>
											Close
										</Button>
									</DrawerClose>
								</nav>
							</div>
						</DrawerContent>
					</Drawer>

					<Link href="/" className="flex items-center gap-1">
						<Image
							src="/logo.svg"
							alt="Logo"
							width={25}
							height={25}
							className="cursor-pointer"
						/>
						<h3 className="text-black font-semibold text-lg">
							BandWise
						</h3>
					</Link>
				</div>

				{/* Right-side actions */}
				<div className="flex items-center gap-2">
					<Button variant="ghost">Sign In</Button>
					<Button className="btn-red-gradient">Get Started</Button>
					{/* <div className="rainbow-border-wrapper overflow-hidden">
						<Button className="bg-primary-400  !rounded-full !px-6 !py-3 w-full h-full">
							Get Started
						</Button>
					</div> */}
				</div>
			</div>
		</>
	);
}

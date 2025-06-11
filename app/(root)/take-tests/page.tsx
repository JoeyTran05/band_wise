"use client";

import { Headphones, BookOpen, PenLine, Mic } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tests = [
	{
		title: "Speaking Test",
		icon: <Mic className="h-6 w-6 text-primary" />,
		description:
			"Real-time speaking with AI and get instant expert feedback.",
		href: "/take-tests/speaking",
		duration: "15 mins",
	},
	{
		title: "Writing Test",
		icon: <PenLine className="h-6 w-6 text-primary" />,
		description: "Practice writing Task 1 and Task 2 with AI scoring.",
		href: "/take-tests/writing",
		duration: "60 mins",
	},
	{
		title: "Listening Test",
		icon: <Headphones className="h-6 w-6 text-primary" />,
		description:
			"Practice listening to real IELTS audio and answer questions.",
		href: "/take-tests/listening",
		duration: "30 mins",
	},
	{
		title: "Reading Test",
		icon: <BookOpen className="h-6 w-6 text-primary" />,
		description:
			"Test your reading skills with academic and general texts.",
		href: "/take-tests/reading",
		duration: "60 mins",
	},
];

const TakeTests = () => {
	return (
		<div className="max-w-5xl mx-auto px-4 py-10">
			<h1 className="text-3xl font-bold mb-6 text-center">Take a Test</h1>
			<p className="text-center text-gray-600 dark:text-gray-300 mb-10">
				Choose an IELTS test to begin practicing. Your progress will be
				tracked.
			</p>

			<div className="flex flex-wrap justify-center gap-6">
				{tests.map((test) => (
					<Card
						key={test.title}
						className="transition hover:shadow-md w-[45%]"
					>
						<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
							<CardTitle className="text-lg font-semibold">
								{test.title}
							</CardTitle>
							{test.icon}
						</CardHeader>
						<CardContent className="flex flex-col justify-between h-full">
							<p className="text-sm text-muted-foreground mb-4">
								{test.description}
							</p>
							<div className="flex items-center justify-between">
								<span className="text-sm text-gray-500 dark:text-gray-400">
									{test.duration}
								</span>
								<Link href={test.href}>
									<Button>Start</Button>
								</Link>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
};

export default TakeTests;

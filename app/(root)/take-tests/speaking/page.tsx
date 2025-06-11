"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Mic, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import {
	getCompletedSpeakingSets,
	getSpeakingSets,
} from "@/lib/actions/test.action";
import DropDownMenu from "@/components/DropDownMenu";
import MicTest from "@/components/MicTest";

type SpeakingSet = {
	id: number;
	topic: string;
};

const SpeakingTestSession = () => {
	const [speakingSets, setSpeakingSets] = useState<SpeakingSet[]>([]);
	const [numberOfSets, setNumberOfSets] = useState<number>(0);
	const [showTips, setShowTips] = useState<boolean>(true);
	const [testMode, setTestMode] = useState("full");
	const [selectedSetId, setSelectedSetId] = useState<string>("random");
	const [completedCount, setCompletedCount] = useState<number>(0);
	const router = useRouter();
	const { user, isSignedIn } = useUser();

	useEffect(() => {
		if (!user) return;

		const fetchData = async () => {
			const { sets, uniqueSets } = await getSpeakingSets();
			setNumberOfSets(sets.length);
			setSpeakingSets(uniqueSets);

			const completedSets = await getCompletedSpeakingSets(user!.id);
			setCompletedCount(completedSets?.length || 0);
		};

		fetchData();
	}, [user]);

	useEffect(() => {
		const screenWidth = window.innerWidth;
		console.log("Screen width:", screenWidth);
		if (screenWidth < 768) {
			setShowTips(false);
		}
	}, []);

	if (!isSignedIn) {
		return <RedirectToSignIn />;
	}

	const handleSetChange = (value: string) => {
		setSelectedSetId(value);
	};

	const handleTestChange = (value: string) => {
		setTestMode(value);
	};

	const startTest = () => {
		const idToUse =
			selectedSetId === "random"
				? `${completedCount + 1}`
				: selectedSetId;
		router.push(`/speaking-test/${idToUse}`);
	};

	const testMicrophone = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then(() => alert("🎤 Microphone test passed!"))
			.catch(() =>
				alert("❌ Microphone not accessible. Please check permissions.")
			);
	};

	return (
		<div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
			<h1 className="text-3xl font-bold text-center">
				Prepare for the IELTS Speaking Test
			</h1>
			<p className="text-center text-gray-600">
				Choose a test set and review the format before beginning.
			</p>

			<div className="flex justify-between items-center">
				{/* Microphone Test Button */}
				{/* <Button
					variant="outline"
					className=" md:w-auto"
					onClick={testMicrophone}
				>
					<Mic className="w-4 h-4 mr-2" />
					Test Microphone
				</Button> */}
				<MicTest />

				{/* Progress Badge */}
				<div className="flex justify-end">
					<span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
						{completedCount} of {numberOfSets || "?"} completed
					</span>
				</div>
			</div>

			{/* Format Card */}
			<Card>
				<CardContent className="space-y-3 px-5">
					<h2 className="text-xl font-semibold">
						Speaking Test Format
					</h2>
					<ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
						<li>
							<strong>Part 1:</strong> Introduction & Interview
							(4–5 mins)
						</li>
						<li>
							<strong>Part 2:</strong> Long Turn — 1-minute prep,
							1–2 mins speaking
						</li>
						<li>
							<strong>Part 3:</strong> Discussion on abstract
							ideas (4–5 mins)
						</li>
					</ul>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Timer className="w-4 h-4" />
						Estimated Total Time: 11–14 minutes
					</div>
					{/* Platform Feature Description */}
					<div className="mt-6 px-4 bg-blue-50 rounded-md text-sm text-blue-900">
						<DropDownMenu
							defaultValue={showTips ? "item-1" : ""}
							trigger={
								<h3 className="font-semibold mb-2">
									How It Works
								</h3>
							}
							content={
								<div>
									<p className="mb-2">
										Take the speaking test in real-time
										powered by AI. Our platform uses
										advanced voice recognition and AI-driven
										analysis to simulate an IELTS examiner.
									</p>
									<p>
										You&apos;ll answer questions live, and
										receive instant, personalized feedback
										on your fluency, pronunciation, and
										coherence — helping you improve faster
										with each attempt.
									</p>
								</div>
							}
						/>
					</div>
				</CardContent>
			</Card>

			<div className="flex justify-around gap-10">
				{/* Test Set Selector */}
				<div className="space-y-2">
					<Label>Select a Speaking Set</Label>
					<Select
						value={selectedSetId}
						onValueChange={handleSetChange}
					>
						<SelectTrigger>
							<SelectValue placeholder="Choose a topic or pick randomly" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="random">🎲 Random</SelectItem>
							{speakingSets.map(({ id, topic }) => (
								<SelectItem key={id} value={id.toString()}>
									{topic}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Test Mode Selector */}
				<div className="space-y-2">
					<Label>Select a Test Mode</Label>
					<Select value={testMode} onValueChange={handleTestChange}>
						<SelectTrigger>
							<SelectValue placeholder="Choose test mode" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="full">Full Test</SelectItem>
							<SelectItem value="part1">Part 1 Only</SelectItem>
							<SelectItem value="part2_3">Part 2 & 3</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Start Button */}
			<div className="text-center pt-4">
				<Button
					size="lg"
					className="w-full md:w-auto"
					onClick={startTest}
					// disabled={!selectedSetId}
				>
					Start Speaking Test
				</Button>
			</div>
		</div>
	);
};

export default SpeakingTestSession;

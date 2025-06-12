"use client";

import SpeakingComponent from "@/components/SpeakingComponent";
import { getSetTopic, getSpeakingSetForUser } from "@/lib/actions/test.action";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

interface SpeakingTestSessionProps {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ mode: string }>;
}

const testDescriptions = {
	part1: "Introduction & Interview",
	part2: "Long Turn — 1-minute preparation, 1–2 minutes speaking",
	part3: "Discussion on abstract ideas",
};

enum TestPart {
	part1 = "Part 1",
	part2 = "Part 2",
	part3 = "Part 3",
}

const SpeakingTestSession = ({
	params,
	searchParams,
}: SpeakingTestSessionProps) => {
	const [testPart, setTestPart] = useState<TestPart>(TestPart.part1);
	const [questions, setQuestions] = useState<QuestionsByPart>();
	const [topics, setTopics] = useState<string[]>([]);
	const { user, isSignedIn } = useUser();

	useEffect(() => {
		if (!user) return;

		const fetchData = async () => {
			const { id } = await params;
			const { mode } = (await searchParams) || "full";
			const speakingSet = await getSpeakingSetForUser(id);
			const firstTopic = await getSetTopic(speakingSet.part1[0]?.set_id);
			const secondTopic = await getSetTopic(speakingSet.part2[0]?.set_id);
			setTopics([firstTopic, secondTopic]);
			setQuestions(speakingSet);

			if (speakingSet.part2.length === 0)
				redirect("/take-tests/speaking");

			console.log("Speaking Set:", speakingSet);
			console.log("Topics:", firstTopic + secondTopic);
		};

		fetchData();
	}, [user, params, searchParams]);

	if (!isSignedIn) return <RedirectToSignIn />;
	return (
		<main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
			<article className="flex rounded-border justify-between p-6 max-md:flex-col">
				<div className="flex items-center gap-2">
					<div
						className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
						style={{ backgroundColor: "white" }}
					>
						<Image
							src={`/logo.svg`}
							alt="logo"
							width={35}
							height={35}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<p className="font-bold text-2xl">Speaking Test</p>
							{/* <div className="subject-badge max-sm:hidden">
								<span className="text-sm">{testPart}</span>
							</div> */}
						</div>
						<p className="text-lg">{`${testPart} - Topic: ${
							testPart === TestPart.part1
								? testDescriptions.part1
								: testPart === TestPart.part2
								? testDescriptions.part2
								: testDescriptions.part3
						}`}</p>
					</div>
				</div>
				<div className="items-start text-2xl max-md:hidden">
					{testPart === TestPart.part1
						? "4-5 minutes"
						: testPart === TestPart.part2
						? "2-3 minutes"
						: "4-5 minutes"}
				</div>
			</article>

			<SpeakingComponent
				userName={user.fullName!}
				userImage={user.imageUrl!}
				questions={questions!}
				topics={topics}
			/>
		</main>
	);
};

export default SpeakingTestSession;

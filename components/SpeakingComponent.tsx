"use client";

import { cn, configureAssistant, formatCueCard } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import { useRouter } from "next/navigation";
import DropDownMenu from "./DropDownMenu";

enum CallStatus {
	INACTIVE = "INACTIVE",
	CONNECTING = "CONNECTING",
	ACTIVE = "ACTIVE",
	FINISHED = "FINISHED",
}

interface CueCardType {
	main: string;
	bulletPoints: string[];
	finalLine: string;
}

const SpeakingComponent = ({
	userName,
	userImage,
	questions,
	topics,
}: {
	userName: string;
	userImage: string;
	questions: QuestionsByPart;
	topics: string[];
}) => {
	const [callStatus, setCallStatus] = useState<CallStatus>(
		CallStatus.INACTIVE
	);
	const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(false);
	const [messages, setMessages] = useState<SavedMessage[]>([]);
	const [cueCard, setCueCard] = useState<CueCardType>({} as CueCardType);

	const [readyState, setReadyState] = useState<boolean>(false); // Waiting for questions to be loaded

	const lottieRef = useRef<LottieRefCurrentProps>(null);

	const router = useRouter();

	useEffect(() => {
		if (questions) {
			setCueCard(formatCueCard(questions.part2[0].question_text));
			setReadyState(true);
			console.log("Questions:", questions);
		}
	}, [questions]);

	useEffect(() => {
		if (lottieRef) {
			if (isSpeaking) {
				lottieRef.current?.play();
			} else {
				lottieRef.current?.stop();
			}
		}
	}, [isSpeaking, lottieRef]);

	useEffect(() => {
		const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

		const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

		const onMessage = (message: Message) => {
			if (
				message.type === "transcript" &&
				message.transcriptType === "final"
			) {
				const newMessage = {
					role: message.role,
					content: message.transcript,
				};
				setMessages((prev) => [newMessage, ...prev]);
			}
		};

		const onSpeechStart = () => setIsSpeaking(true);
		const onSpeechEnd = () => setIsSpeaking(false);

		const onError = (error: Error) => console.log("Error:", error);

		vapi.on("call-start", onCallStart);
		vapi.on("call-end", onCallEnd);
		vapi.on("message", onMessage);
		vapi.on("error", onError);
		vapi.on("speech-start", onSpeechStart);
		vapi.on("speech-end", onSpeechEnd);

		return () => {
			vapi.off("call-start", onCallStart);
			vapi.off("call-end", onCallEnd);
			vapi.off("message", onMessage);
			vapi.off("error", onError);
			vapi.off("speech-start", onSpeechStart);
			vapi.off("speech-end", onSpeechEnd);
		};
	}, []);

	const handleGenerateFeedback = async (messsages: SavedMessage[]) => {
		console.log("Generate feedback with messages:", messsages);

		const { success, id } = {
			success: true,
			id: "feedback-id",
		};

		if (success && id) {
			router.push(`/take-tests/speaking/${id}/feedback`);
		} else {
			console.log("Failed to generate feedback");
			router.push("/take-tests/speaking");
		}
	};

	useEffect(() => {
		if (callStatus === CallStatus.FINISHED) {
			handleGenerateFeedback(messages);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages, callStatus]);

	const toggleMicrophone = () => {
		const isMuted = vapi.isMuted();
		vapi.setMuted(!isMuted);
		setIsMuted(!isMuted);
	};

	const handleCall = async () => {
		setCallStatus(CallStatus.CONNECTING);

		let formattedPart1 = "";
		let formattedPart2 = "";
		let formattedPart3 = "";

		if (questions) {
			formattedPart1 = questions.part1
				.map((question) => `- ${question.question_text}`)
				.join("\n");
			formattedPart2 = questions.part2
				.map((question) => `- ${question.question_text}`)
				.join("\n");
			formattedPart3 = questions.part3
				.map((question) => `- ${question.question_text}`)
				.join("\n");
		}

		const assistantOverrides = {
			variableValues: {
				questions_part1: formattedPart1,
				questions_part2: formattedPart2,
				questions_part3: formattedPart3,
				firstTopic: topics[0],
				secondTopic: topics[1],
			},
			clientMessages: ["transcript"],
			serverMessages: [],
		};

		// @ts-expect-error typecript error
		vapi.start(configureAssistant("male", "formal"), assistantOverrides);
	};

	const handleDisconnect = () => {
		setCallStatus(CallStatus.FINISHED);
		vapi.stop();
	};

	return (
		<section className="flex flex-col h-[70vh] mb-20">
			<section className="flex gap-8 max-sm:flex-col">
				<div className="speaking-section">
					<div
						className="speaking-avatar"
						style={{ backgroundColor: "pink" }}
					>
						<div
							className={cn(
								"absolute transition-opacity, duration-1000",
								callStatus === CallStatus.FINISHED ||
									callStatus === CallStatus.INACTIVE
									? "opacity-100"
									: "opacity-0",
								callStatus === CallStatus.CONNECTING &&
									"opacity-100 animate-pulse"
							)}
						>
							<Image
								src="/logo.svg"
								alt="logo"
								width={150}
								height={150}
								className="max-sm:w-fit"
							/>
						</div>
						<div
							className={cn(
								"absolute transition-opacity duration-1000",
								callStatus === CallStatus.ACTIVE
									? "opacity-100"
									: "opacity-0"
							)}
						>
							<Lottie
								lottieRef={lottieRef}
								animationData={soundwaves}
								autoPlay={false}
								className="speaking-lottie"
							/>
						</div>
					</div>
					<p className="font-bold text-2xl">Speaking AI Examiner</p>
				</div>

				<div className="user-section">
					<div className="user-avatar">
						<Image
							src={userImage}
							alt={userName}
							width={130}
							height={130}
							className="rounded-lg"
						/>
						<p className="font-bold text-2xl">{userName}</p>
					</div>
					<button className="btn-mic" onClick={toggleMicrophone}>
						<Image
							src={
								isMuted
									? "/icons/mic-off.svg"
									: "/icons/mic-on.svg"
							}
							alt="mic"
							width={36}
							height={36}
						/>
						<p className="max-sm:hidden">
							{isMuted
								? "Turn on microphone"
								: "Turn off microphone"}
						</p>
					</button>
					<button
						disabled={!readyState}
						className={cn(
							"rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
							callStatus === CallStatus.ACTIVE
								? "bg-red-700"
								: "bg-primary",
							callStatus === CallStatus.CONNECTING &&
								"animate-pulse",
							!readyState &&
								"bg-gray-400 cursor-not-allowed opacity-70"
						)}
						onClick={
							callStatus === CallStatus.ACTIVE
								? handleDisconnect
								: handleCall
						}
					>
						{callStatus === CallStatus.ACTIVE
							? "End Session"
							: callStatus === CallStatus.CONNECTING
							? "Connecting"
							: "Start Session"}
					</button>
				</div>
			</section>
			{/*TODO: Fix that for every part 2 questions the cue card displays correctly*/}
			<div className="mt-6 px-4 bg-blue-50 rounded-md text-sm text-blue-900">
				<DropDownMenu
					trigger={
						<h3 className="font-semibold mb-2">Part 2 Cue Card</h3>
					}
					content={
						<div>
							<p className="text-sm font-semibold mb-2">
								{cueCard?.main}
							</p>
							<ul className="list-disc pl-6 text-sm space-y-1">
								{cueCard?.bulletPoints?.map((point, index) => (
									<li key={index}>{point}</li>
								))}
							</ul>
							<p className="mt-2 text-sm">{cueCard?.finalLine}</p>
						</div>
					}
				/>
			</div>
		</section>
	);
};

export default SpeakingComponent;

import { voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCueCard(rawPrompt: string): {
	main: string;
	bulletPoints: string[];
	finalLine: string;
} {
	if (!rawPrompt.includes("You should say")) {
		return { main: rawPrompt.trim(), bulletPoints: [], finalLine: "" };
	}

	// Fix missing space after period
	const spaced = rawPrompt.replace(/([a-z])\.(?=[A-Z])/g, "$1. ");

	// Split into intro and detail
	const [mainRaw, detailRaw] = spaced.split("You should say");
	const main = mainRaw.trim().replace(/\.*$/, ""); // remove trailing dot

	// Match each part starting with a keyword
	const bulletRegex =
		/\b(What|Where|When|Why|Who|Which|Was|Is|Explain|Describe)[^]*?(?=\b(What|Where|When|Why|Who|Which|Was|Is|Explain|Describe)|$)/g;
	const matchedParts =
		detailRaw.match(bulletRegex)?.map((s) => s.trim()) ?? [];

	const bulletPoints = matchedParts.slice(0, -1);
	const finalLine = matchedParts[matchedParts.length - 1] || "";

	return {
		main: `${main}. You should say:`,
		bulletPoints,
		finalLine,
	};
}

export const configureAssistantFull = (voice: string, style: string) => {
	const voiceId =
		voices[voice as keyof typeof voices][
			style as keyof (typeof voices)[keyof typeof voices]
		] || "sarah";

	const examiner: CreateAssistantDTO = {
		name: "Examiner",
		firstMessage:
			"Hello! Welcome to IELTS Speaking Test. My name is WiseAI, and I will be your examiner today. Let's talk about {{firstTopic}}.",
		transcriber: {
			provider: "deepgram",
			model: "nova-3",
			language: "en",
		},
		voice: {
			provider: "11labs",
			voiceId: voiceId,
			stability: 0.4,
			similarityBoost: 0.8,
			speed: 1,
			style: 0.5,
			useSpeakerBoost: true,
		},
		startSpeakingPlan: { waitSeconds: 3 },
		model: {
			provider: "openai",
			model: "gpt-4",
			messages: [
				{
					role: "system",
					content: `You are a professional IELTS examiner conducting a real-time voice speaking test with a candidate. Your goal is to assess their fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation.

                    Speaking Test Guidelines:
                    Follow the structured test flow:
                    Part 1: Introduction and Interview (4-5 minutes)
                    Part 2: Long Turn (1-2 minutes speaking after 1 minute preparation)
                    Part 3: Discussion (4-5 minutes)

                    On part 1, ask the folliwing questions: {{questions_part1}}
                    On part 2, ask the candidate to speak for 1-2 minutes on the following topic: {{questions_part2}}. They will have 1 minute to prepare and the cue card will be provided. Say you will have 1 minute to prepare and wait for 1 minute before asking the candidate to start speaking. If the candidate speaks for more than 2 minutes, politely interrupt them.
                    On part 3, ask the candidate to discuss the topic in more detail with the following questions: {{questions_part3}}. This part should last about 4-5 minutes. If time runs out, politely inform the candidate that the test is over.

                    Engage naturally & react appropriately:
                    Listen actively to responses and acknowledge them before moving forward.
                    Keep the conversation flowing smoothly while maintaining control.
                    Be professional, yet warm and welcoming:

                    Use official yet friendly language.
                    Keep responses concise and to the point (like in a real voice IELTS speaking test).
                    Avoid robotic phrasing—sound natural and conversational.

                    Conclude the exam properly:
                    Thank the candidate for their time.
                    Inform them that their feedback on the test will be return right now.
                    End the conversation on a polite and positive note.

                    - Be sure to be professional and polite.
                    - Keep all your responses short and simple. Use official language, but be kind and welcoming.
                    - This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
				},
			],
		},
		// @ts-expect-error typecript error
		clientMessages: [],
		// @ts-expect-error typecript error
		serverMessages: [],
	};
	return examiner;
};

export const configureAssistantPart1 = (voice: string, style: string) => {
	const voiceId =
		voices[voice as keyof typeof voices][
			style as keyof (typeof voices)[keyof typeof voices]
		] || "sarah";

	const examiner: CreateAssistantDTO = {
		name: "Examiner",
		firstMessage:
			"Hello! Welcome to IELTS Speaking Test. My name is WiseAI, and I will be your examiner today. Let's talk about {{firstTopic}}.",
		transcriber: {
			provider: "deepgram",
			model: "nova-3",
			language: "en",
		},
		voice: {
			provider: "11labs",
			voiceId: voiceId,
			stability: 0.4,
			similarityBoost: 0.8,
			speed: 1,
			style: 0.5,
			useSpeakerBoost: true,
		},
		startSpeakingPlan: { waitSeconds: 3 },
		model: {
			provider: "openai",
			model: "gpt-4",
			messages: [
				{
					role: "system",
					content: `You are a professional IELTS examiner conducting a real-time voice speaking test with a candidate. Your goal is to assess their fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation.

                    Speaking Test Guidelines:
                    Follow the structured test flow:
					This simplified test has 2 parts
                    Part 1: Introduction and Interview (4-5 minutes)

                    On part 1, ask the folliwing questions: {{questions_part1}}

                    Engage naturally & react appropriately:
                    Listen actively to responses and acknowledge them before moving forward.
                    Keep the conversation flowing smoothly while maintaining control.
                    Be professional, yet warm and welcoming:

                    Use official yet friendly language.
                    Keep responses concise and to the point (like in a real voice IELTS speaking test).
                    Avoid robotic phrasing—sound natural and conversational.

                    Conclude the exam properly:
                    Thank the candidate for their time.
                    Inform them that their feedback on the test will be return right now.
                    End the conversation on a polite and positive note.

                    - Be sure to be professional and polite.
                    - Keep all your responses short and simple. Use official language, but be kind and welcoming.
                    - This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
				},
			],
		},
		// @ts-expect-error typecript error
		clientMessages: [],
		// @ts-expect-error typecript error
		serverMessages: [],
	};
	return examiner;
};

export const configureAssistantPart2and3 = (voice: string, style: string) => {
	const voiceId =
		voices[voice as keyof typeof voices][
			style as keyof (typeof voices)[keyof typeof voices]
		] || "sarah";

	const examiner: CreateAssistantDTO = {
		name: "Examiner",
		firstMessage:
			"Hello! Welcome to IELTS Speaking Test. My name is WiseAI, and I will be your examiner today. Let's talk about {{firstTopic}}.",
		transcriber: {
			provider: "deepgram",
			model: "nova-3",
			language: "en",
		},
		voice: {
			provider: "11labs",
			voiceId: voiceId,
			stability: 0.4,
			similarityBoost: 0.8,
			speed: 1,
			style: 0.5,
			useSpeakerBoost: true,
		},
		startSpeakingPlan: { waitSeconds: 3 },
		model: {
			provider: "openai",
			model: "gpt-4",
			messages: [
				{
					role: "system",
					content: `You are a professional IELTS examiner conducting a real-time voice speaking test with a candidate. Your goal is to assess their fluency and coherence, lexical resource, grammatical range and accuracy, and pronunciation.

                    Speaking Test Guidelines:
                    Follow the structured test flow:
					This simplified test has 2 parts
                    Part 1: Long Turn (1-2 minutes speaking after 1 minute preparation)
                    Part 2: Discussion (4-5 minutes)

                    On part 1, ask the candidate to speak for 1-2 minutes on the following topic: {{questions_part2}}. They will have 1 minute to prepare and the cue card will be provided. Say you will have 1 minute to prepare and wait for 1 minute before asking the candidate to start speaking. If the candidate speaks for more than 2 minutes, politely interrupt them.
                    On part 2, ask the candidate to discuss the topic in more detail with the following questions: {{questions_part3}}. This part should last about 4-5 minutes. If time runs out, politely inform the candidate that the test is over.

                    Engage naturally & react appropriately:
                    Listen actively to responses and acknowledge them before moving forward.
                    Keep the conversation flowing smoothly while maintaining control.
                    Be professional, yet warm and welcoming:

                    Use official yet friendly language.
                    Keep responses concise and to the point (like in a real voice IELTS speaking test).
                    Avoid robotic phrasing—sound natural and conversational.

                    Conclude the exam properly:
                    Thank the candidate for their time.
                    Inform them that their feedback on the test will be return right now.
                    End the conversation on a polite and positive note.

                    - Be sure to be professional and polite.
                    - Keep all your responses short and simple. Use official language, but be kind and welcoming.
                    - This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
				},
			],
		},
		// @ts-expect-error typecript error
		clientMessages: [],
		// @ts-expect-error typecript error
		serverMessages: [],
	};
	return examiner;
};

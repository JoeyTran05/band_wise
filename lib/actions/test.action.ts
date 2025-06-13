"use server";

import { feedbackSchema } from "@/constants";
import { createSupabaseClient } from "../supabase";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

export const getRandomPart1Questions = async () => {
	const supabase = createSupabaseClient();

	const { count } = await supabase
		.from("speaking_first_part_sets")
		.select("*", { count: "exact", head: true });

	const randomId = Math.floor(Math.random() * (count || 0)) + 1;

	const { data: questions, error: error } = await supabase
		.from("speaking_first_part_sets")
		.select("id, order_id, topic, questions")
		.eq("order_id", randomId)
		.single();

	if (error || !questions) {
		throw new Error(error?.message || "No questions set found for part 1");
	}

	return questions as FirstPart;
};

export const getSpeakingSetForUser = async (id: string) => {
	const supabase = createSupabaseClient();

	// Fetching part 1 questions from a random set
	const questions_part1 = await getRandomPart1Questions();

	// Fetching the next speaking set for the user
	const { data: questions, error: questionsError } = await supabase
		.from("speaking_sets")
		.select("id, order_id, topic, cue_card, questions")
		.eq("id", id)
		.single();

	if (questionsError) {
		throw new Error(questionsError.message);
	}

	return {
		firstTopic: questions_part1.topic,
		secondTopic: questions.topic,
		part1: questions_part1.questions,
		part2: questions.cue_card,
		part3: questions.questions,
		firstPartId: questions_part1.id,
	} as SpeakingSet;
};

export const getUniqueCompletedCount = async (userId: string) => {
	const supabase = createSupabaseClient();

	const { data: completedResults, error: completedError } = await supabase
		.from("speaking_results")
		.select("*")
		.eq("user_id", userId);

	const uniqueResults = Array.from(
		new Set(completedResults?.map((result) => result.set_id_second))
	);

	if (completedError) return 0;

	return uniqueResults?.length;
};

export const getRandomSetId = async () => {
	// !! implement get random ID but ensure it is unique and not already completed by the user !!

	const supabase = createSupabaseClient();

	const { count } = await supabase
		.from("speaking_sets")
		.select("*", { count: "exact", head: true });

	const randomId = Math.floor(Math.random() * (count || 0)) + 1;

	const { data: set, error } = await supabase
		.from("speaking_sets")
		.select("id, order_id")
		.eq("order_id", randomId)
		.single();

	if (error || !set) throw new Error(error?.message || "Set not found");

	return set.id;
};

export const getSpeakingTopicAndId = async () => {
	const supabase = createSupabaseClient();

	const { data: sets, error } = await supabase
		.from("speaking_sets")
		.select("id, topic");

	if (error || !sets || sets.length === 0) {
		throw new Error(error?.message || "No speaking sets found");
	}

	const uniqueSetsMap = new Map();

	for (const set of sets) {
		if (!uniqueSetsMap.has(set.topic)) {
			uniqueSetsMap.set(set.topic, set); // keep the full set object
		}
	}

	const uniqueSets = Array.from(uniqueSetsMap.values());

	return {
		topics: sets,
		uniqueTopics: uniqueSets,
	};
};

export const createFeedback = async (params: CreateFeedbackParams) => {
	const { testId, firstPartId, userId, transcript } = params;
	const supabase = createSupabaseClient();

	try {
		const formattedTranscript = transcript
			.map(
				(senctence: { role: string; content: string }) =>
					`- ${senctence.role}: ${senctence.content}\n`
			)
			.join("");

		const {
			object: {
				total_score,
				category_scores,
				strengths,
				areas_for_improvement,
				final_assessment,
			},
		} = await generateObject({
			model: google("gemini-2.0-flash-001", {
				structuredOutputs: false,
			}),
			schema: feedbackSchema,
			prompt: `
        You are an AI IELTS examiner analyzing an IELTS mock speaking test. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 9 in the following areas with 9 being the highest and there are only whole scores or .5 scores (for example 9.0 or 8.5). Do not add categories other than the ones provided:
        - **Fluency and Coherence**: ability to talk with normal levels of continuity, rate and effort, and to link ideas and language together to form coherent, connected speech.
        - **Lexical Resource**: range of vocabulary at the test taker’s disposal, which will influence the range of topics which they can discuss, and the precision with which meanings are expressed and attitudes conveyed.
        - **Grammatical Range and Accuracy**: accurate and appropriate use of syntactic forms in order to meet Speaking test requirements, and to the test taker’s range of grammatical resources, 
a feature which will help to determine the complexity of propositions which can be expressed.
        - **Pronunciation**: accurate and sustained use of a range of phonological features to convey meaningful messages.
        `,
			system: "You are a professional IELTS examiner analyzing an IELTS mock speaking test. Your task is to evaluate the candidate based on structured categories",
		});

		const { data, error } = await supabase
			.from("speaking_results")
			.insert({
				user_id: userId,
				set_id_first: firstPartId,
				set_id_second: testId,
				total_score,
				category_scores,
				strengths,
				areas_for_improvement,
				final_assessment,
			})
			.select();

		if (error || !data)
			throw new Error(error?.message || "Failed to create feedback");

		return { success: true, feedbackId: data[0].set_id_second };
	} catch (e) {
		console.error("Error creating feedback:", e);
		return {
			success: false,
			feedbackId: "",
		};
	}
};

export const getFeedbackById = async (params: GetFeedbackBySetIdParams) => {
	const supabase = createSupabaseClient();
	const { id, userId } = params;

	const { data, error } = await supabase
		.from("speaking_results")
		.select("*")
		.eq("set_id_second", id)
		.eq("user_id", userId)
		.single();

	if (error || !data) {
		throw new Error(error?.message || "Feedback not found");
	}

	return data as Feedback;
};

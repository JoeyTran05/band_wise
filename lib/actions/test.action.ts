"use server";

import { createSupabaseClient } from "../supabase";

export const getCompletedSpeakingSets = async (userId: string) => {
	const supabase = createSupabaseClient();

	const { data: completedResults, error: completedError } = await supabase
		.from("speaking_results")
		.select("set_id")
		.eq("user_id", userId);

	if (completedError) {
		throw new Error(completedError.message);
	}

	const completedSetIds = completedResults?.map((res) => res.set_id) ?? [];

	return completedSetIds;
};

export const getPart1SpeakingQuestions = async () => {
	const supabase = createSupabaseClient();

	const totalPart1Set = 27;
	const randomPart1SetId = Math.floor(Math.random() * totalPart1Set) + 1;

	const { data: questions, error: error } = await supabase
		.from("speaking_questions")
		.select("*")
		.eq("part", 1)
		.eq("set_id", randomPart1SetId)
		.order("question_number", { ascending: true });

	if (error || !questions || questions.length === 0) {
		throw new Error(error?.message || "No questions found for part 1");
	}

	return questions;
};

export const getNextSpeakingSetForUser = async (userId: string) => {
	const supabase = createSupabaseClient();

	// Fetching part 1 questions from a random set
	const questions_part1 = await getPart1SpeakingQuestions();

	// Fetching the next speaking set for the user
	// 1. Get all completed set_ids for this user
	const completedSetIds = await getCompletedSpeakingSets(userId);

	// 2. Fetch the next set (part 2 & 3) that is not completed by the user
	const { data: nextSet, error: nextSetError } = await supabase
		.from("speaking_sets")
		.select("*")
		.eq("part", 2)
		.not("id", "in", `(${completedSetIds.join(",") || 0})`) // Fallback to 0 if empty
		.order("id", { ascending: true })
		.limit(1)
		.single();

	if (nextSetError) {
		throw new Error(nextSetError.message);
	}

	// 3. Fetching questions for the next set (part 2 & 3)
	const { data: questions, error: questionsError } = await supabase
		.from("speaking_questions")
		.select("*")
		.eq("set_id", nextSet.id)
		.order("part, question_number", { ascending: true });

	if (questionsError) {
		throw new Error(questionsError.message);
	}

	return {
		set: nextSet,
		questionsByPart: {
			part1: questions_part1,
			part2: questions.filter((q) => q.part === 2),
			part3: questions.filter((q) => q.part === 3),
		},
	};
};

export const getSpeakingSets = async () => {
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
		sets,
		uniqueSets,
		// uniqueSets: [...new Set(sets.map((set) => set.topic))],
	};
};

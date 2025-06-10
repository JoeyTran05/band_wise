"use server";

import { createSupabaseClient } from "../supabase";

export const getSpeakingQuestions = async () => {
	const supabase = createSupabaseClient();

	// Fetching part 1 questions from a random set
	const totalPart1Set = 27;
	const randomPart1SetId = Math.floor(Math.random() * totalPart1Set) + 1;

	const { data: questions_part1, error: part1Error } = await supabase
		.from("speaking_questions")
		.select("*")
		.eq("part", 1)
		.eq("set_id", randomPart1SetId)
		.order("question_number", { ascending: true });

	if (part1Error || !questions_part1 || questions_part1.length === 0) {
		throw new Error(part1Error?.message || "No questions found for part 1");
	}

	const { data: sets, error: setError } = await supabase
		.from("speaking_sets")
		.select("id");

	if (setError || !sets || sets.length === 0) {
		throw new Error(setError?.message || "No speaking sets found");
	}

	// Try up to N attempts to find a complete set
	let completeSet = null;
	let questions = [];
	for (let i = 0; i < sets.length; i++) {
		const randomIndex = Math.floor(Math.random() * sets.length);
		const randomSet = sets[randomIndex];

		const { data, error } = await supabase
			.from("speaking_questions")
			.select("*")
			.eq("set_id", randomSet.id);

		if (error) continue;

		const hasPart2 = data.some((q) => q.part === 2);
		const hasPart3 = data.some((q) => q.part === 3);

		if (hasPart2 && hasPart3) {
			completeSet = randomSet;
			questions = data;
			break;
		}
	}

	return {
		set: completeSet,
		questionsByPart: {
			part1: questions_part1,
			part2: questions.filter((q) => q.part === 2),
			part3: questions.filter((q) => q.part === 3),
		},
	};
};

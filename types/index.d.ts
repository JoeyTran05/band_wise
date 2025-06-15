interface Feedback {
	id: string;
	set_Id: number;
	total_score: number;
	category_scores: Array<{
		name: string;
		score: number;
		comment: string;
	}>;
	strengths: string[];
	areas_for_improvement: string[];
	final_assessment: string;
	created_at: string;
}

interface CreateFeedbackParams {
	userId: string;
	testId: string;
	firstPartId: string;
	transcript: { role: string; content: string }[];
	feedbackId?: string;
}

interface RouteParams {
	params: Promise<Record<string, string>>;
	searchParams: Promise<Record<string, string>>;
}

interface GetFeedbackBySetIdParams {
	id: string;
	userId: string;
}

interface SignInParams {
	email: string;
	idToken: string;
}

interface SignUpParams {
	uid: string;
	name: string;
	email: string;
	password: string;
}

type FormType = "sign-in" | "sign-up";

interface DropDownMenuProps {
	trigger: React.ReactNode;
	content: React.ReactNode;
	defaultValue?: string;
}

interface FeatureCardProps {
	title: string;
	description: string;
	icon: LucideIcon;
}

interface SpeakingComponentProps {
	userId: string;
	userName: string;
	userImage: string;
	setId: string;
	firstPartId: string;
	questions: FullTestQuestions;
	topics: string[];
	mode: TestMode;
	setTestPart: (part: TestPart) => void;
}

interface FirstPart {
	id: string;
	order_id: number;
	topic: string;
	questions: { question_text: string; question_number: number }[];
}

interface Questions {
	question_text: string;
	question_number: number;
}

interface CueCard {
	main: string;
	final_line: string;
	bullet_points: string[];
}

interface FullTestQuestions {
	part1: Questions[];
	part2: CueCard;
	part3: Questions[];
}

interface SpeakingSet {
	firstTopic: string;
	secondTopic: string;
	part1: Questions[];
	part2: CueCard;
	part3: Questions[];
	firstPartId: string;
}

interface SavedMessage {
	role: "user" | "system" | "assistant";
	content: string;
}

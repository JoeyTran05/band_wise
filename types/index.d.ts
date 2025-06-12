// interface Feedback {
//   id: string;
//   interviewId: string;
//   totalScore: number;
//   categoryScores: Array<{
//     name: string;
//     score: number;
//     comment: string;
//   }>;
//   strengths: string[];
//   areasForImprovement: string[];
//   finalAssessment: string;
//   createdAt: string;
// }

// interface Interview {
//   id: string;
//   role: string;
//   level: string;
//   questions: string[];
//   techstack: string[];
//   createdAt: string;
//   userId: string;
//   type: string;
//   finalized: boolean;
// }

// interface CreateFeedbackParams {
//   interviewId: string;
//   userId: string;
//   transcript: { role: string; content: string }[];
//   feedbackId?: string;
// }

// interface User {
//   name: string;
//   email: string;
//   id: string;
// }

// interface InterviewCardProps {
//   interviewId?: string;
//   userId?: string;
//   role: string;
//   type: string;
//   techstack: string[];
//   createdAt?: string;
// }

// interface AgentProps {
//   userName: string;
//   userId?: string;
//   interviewId?: string;
//   feedbackId?: string;
//   type: "generate" | "interview";
//   questions?: string[];
// }

// interface RouteParams {
//   params: Promise<Record<string, string>>;
//   searchParams: Promise<Record<string, string>>;
// }

// interface GetFeedbackByInterviewIdParams {
//   interviewId: string;
//   userId: string;
// }

// interface GetLatestInterviewsParams {
//   userId: string;
//   limit?: number;
// }

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

// interface InterviewFormProps {
//   interviewId: string;
//   role: string;
//   level: string;
//   type: string;
//   techstack: string[];
//   amount: number;
// }

// interface TechIconProps {
//   techStack: string[];
// }

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

interface Question {
	id: number;
	set_id: number;
	question_text: string;
	question_number: number;
	part: number;
}

interface QuestionsByPart {
	part1: Question[];
	part2: Question[];
	part3: Question[];
}

interface Set {
	id: number;
	topic: string;
	part: number;
}

interface SpeakingSet {
	set: Set;
	questionsByPart: QuestionsByPart;
}

interface SavedMessage {
	role: "user" | "system" | "assistant";
	content: string;
}

"use client";

import FeatureCard from "@/components/FeatureCard";
import {
	Mic,
	PencilLine,
	TrendingUp,
	Volume2,
	Brain,
	BookOpen,
} from "lucide-react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";

const features = [
	{
		title: "AI for Speaking Test",
		description: "Real-time speaking test with AI and instant feedback.",
		icon: Mic,
	},
	{
		title: "AI Writing Evaluation",
		description:
			"Get detailed scoring and suggestions on your writing tasks.",
		icon: PencilLine,
	},
	{
		title: "Progress Tracking",
		description: "Track your improvement with personalized analytics.",
		icon: TrendingUp,
	},
	{
		title: "Voice Practice",
		description: "Practice speaking with real-time AI voice interaction.",
		icon: Volume2,
	},
	{
		title: "Personalized Learning",
		description:
			"Smart suggestions based on your strengths and weaknesses.",
		icon: Brain,
	},
	{
		title: "Mock Test Bank",
		description:
			"Hundreds of Listening, Reading, Writing & Speaking tests.",
		icon: BookOpen,
	},
];

// const features = [
// 	{
// 		title: "AI Speaking",
// 		description: "Instant pronunciation feedback.",
// 		icon: Mic,
// 	},
// 	{
// 		title: "AI Writing",
// 		description: "Detailed writing evaluation.",
// 		icon: PencilLine,
// 	},
// 	{
// 		title: "Progress Tracking",
// 		description: "Track your IELTS growth.",
// 		icon: TrendingUp,
// 	},
// 	{
// 		title: "Voice Practice",
// 		description: "Practice speaking exercises.",
// 		icon: Volume2,
// 	},
// 	{
// 		title: "Personalized Learning",
// 		description: "Custom study paths.",
// 		icon: Brain,
// 	},
// 	{
// 		title: "Mock Test Bank",
// 		description: "Full IELTS mock exams.",
// 		icon: BookOpen,
// 	},
// ];

export default function FeatureSection() {
	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-6 text-center">
				<h2 className="text-3xl font-bold mb-4">Why BandWise?</h2>
				<p className="text-gray-600 mb-10">
					Tools designed to help you master every IELTS section with
					AI precision.
				</p>

				{/* 📱 Mobile View: Carousel */}
				<div className="block lg:hidden">
					<Carousel opts={{ loop: true }} className="w-full">
						<CarouselContent className="-ml-4">
							{features.map((feat) => (
								<CarouselItem
									key={feat.title}
									className="pl-4 basis-1/2"
								>
									<FeatureCard
										title={feat.title}
										description={feat.description}
										icon={feat.icon}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="left-2" />
						<CarouselNext className="right-2" />
					</Carousel>
				</div>

				{/* 🖥️ Desktop View: Grid */}
				<div className="hidden lg:grid grid-cols-3 gap-6 px-4">
					{features.map((feat) => (
						<FeatureCard
							key={feat.title}
							title={feat.title}
							description={feat.description}
							icon={feat.icon}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

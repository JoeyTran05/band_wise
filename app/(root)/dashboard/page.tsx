import {
	BarChart3,
	BookOpen,
	Clock,
	History,
	CheckCircle2,
	Lightbulb,
} from "lucide-react";
import Link from "next/link";

const page = () => {
	return (
		<main className="p-6 space-y-8 max-w-6xl mx-auto">
			{/* Header */}
			<h1 className="text-3xl font-bold">Welcome back, Student!</h1>

			{/* Progress Chart Placeholder */}
			<section className="bg-white p-6 rounded-lg shadow-md">
				<div className="flex items-center gap-2 mb-4">
					<BarChart3 className="text-primary-500" />
					<h2 className="text-xl font-semibold">Your Progress</h2>
				</div>
				<div className="h-48 bg-gray-100 rounded flex items-center justify-center">
					{/* Replace with actual chart later */}
					<p className="text-gray-500">
						[Progress Chart Placeholder]
					</p>
				</div>
			</section>

			{/* Test Actions */}
			<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Link
					href="/mock-tests"
					className="bg-primary-50 p-6 rounded-lg shadow hover:bg-primary-100 transition"
				>
					<div className="flex items-center gap-2 mb-2">
						<BookOpen className="text-primary-500" />
						<h3 className="text-lg font-semibold">Take a Test</h3>
					</div>
					<p>Choose a skill and start a new mock test.</p>
				</Link>

				<Link
					href="/history"
					className="bg-white p-6 rounded-lg shadow hover:bg-gray-50 transition"
				>
					<div className="flex items-center gap-2 mb-2">
						<History className="text-blue-500" />
						<h3 className="text-lg font-semibold">
							Previous Tests
						</h3>
					</div>
					<p>Review your previous IELTS attempts with feedback.</p>
				</Link>
			</section>

			{/* Suggested Practice */}
			<section className="bg-white p-6 rounded-lg shadow-md">
				<div className="flex items-center gap-2 mb-4">
					<Lightbulb className="text-yellow-500" />
					<h2 className="text-xl font-semibold">
						Recommended Practice
					</h2>
				</div>
				<ul className="list-disc pl-6 text-gray-700">
					<li>
						Practice Speaking on the topic:
						&quot;Globalization&quot;
					</li>
					<li>Improve Writing Task 1 – Graph Analysis</li>
					<li>Try a timed Reading Test</li>
				</ul>
			</section>

			{/* Weekly Goal */}
			<section className="bg-white p-6 rounded-lg shadow-md">
				<div className="flex items-center gap-2 mb-4">
					<Clock className="text-pink-500" />
					<h2 className="text-xl font-semibold">This Week’s Goal</h2>
				</div>
				<p>Complete 3 tests and practice Speaking for 30 minutes.</p>
				<div className="mt-2 flex gap-2">
					<CheckCircle2 className="text-green-500" />
					<span>1/3 Tests Completed</span>
				</div>
			</section>
		</main>
	);
};

export default page;

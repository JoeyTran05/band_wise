import React from "react";

const testimonials = [
	{
		text: "I improved my score significantly.",
		name: "Emily R.",
		title: "Language Tutor",
	},
	{
		text: "The feedback helped me ace the exam!",
		name: "David T.",
		title: "Graduate",
	},
	{
		text: "The platform made studying enjoyable.",
		name: "Sophie L.",
		title: "High School Student",
	},
	{
		text: "I felt prepared and confident on test day.",
		name: "Michael B.",
		title: "IT Specialist",
	},
];

const TestimonialsSection = () => {
	return (
		<section id="testimonials" className="py-16">
			<h2 className="text-center text-xl font-bold mb-8">
				Join our community of aspiring test-takers
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-6xl mx-auto">
				{testimonials.map(({ text, name, title }) => (
					<div
						key={name}
						className="bg-red-100 p-6 rounded-lg text-sm"
					>
						<p className="mb-4">“{text}”</p>
						<p className="font-semibold">{name}</p>
						<p className="text-xs text-gray-600">{title}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default TestimonialsSection;

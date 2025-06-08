import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
	title: string;
	description: string;
	icon: LucideIcon;
};

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
	return (
		<div className="bg-white shadow-md p-6 rounded-lg flex flex-col items-center text-center gap-4 hover:shadow-lg transition">
			<Icon className="w-10 h-10 text-red-500" />
			<h3 className="text-xl font-semibold">{title}</h3>
			<p className="text-gray-600">{description}</p>
		</div>
	);
};

export default FeatureCard;

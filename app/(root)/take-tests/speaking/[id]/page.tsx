import { Card } from "@/components/ui/card";

const SpeakingTestSession = () => {
	return (
		<div className="flex gap-4 p-6 max-w-5xl mx-auto">
			<Card className="flex-1 p-4">
				<h2 className="text-lg font-bold mb-2">Examiner</h2>
				{/* <p>{currentQuestion}</p> */}
			</Card>

			<Card className="flex-1 p-4">
				<h2 className="text-lg font-bold mb-2">You</h2>
			</Card>
		</div>
	);
};

export default SpeakingTestSession;

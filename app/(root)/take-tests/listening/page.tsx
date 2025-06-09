"use client";

import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { mockListeningQuestions } from "@/constants";

const ListeningTestPage = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);

	const duration = 270; // 4 minutes 30 seconds

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const updateProgress = () => {
			setProgress((audio.currentTime / duration) * 100);
		};

		audio.addEventListener("timeupdate", updateProgress);
		return () => audio.removeEventListener("timeupdate", updateProgress);
	}, []);

	const togglePlay = () => {
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			audio.pause();
		} else {
			audio.play();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		<div className="p-6 max-w-4xl mx-auto space-y-6">
			{/* AUDIO + PROGRESS */}
			<section className="bg-white p-4 shadow rounded-lg">
				<div className="flex items-center justify-between mb-2">
					<h2 className="text-lg font-semibold">Listening Audio</h2>
					<Button onClick={togglePlay} variant="ghost" size="icon">
						{isPlaying ? <Pause /> : <Play />}
					</Button>
				</div>
				<Progress value={progress} className="h-2 bg-gray-200" />
				<audio
					ref={audioRef}
					src="/audio/sample-listening.mp3"
					preload="auto"
				/>
			</section>

			{/* QUESTIONS */}
			<section className="space-y-6">
				{mockListeningQuestions.map((q, i) => (
					<div key={q.id} className="bg-white p-4 rounded-lg shadow">
						<p className="font-medium mb-2">
							<span className="text-gray-500 mr-1">
								Q{i + 1}.
							</span>
							{q.question}
						</p>
						{q.type === "multiple_choice" ? (
							<ul className="space-y-2">
								{q.options?.map((opt, idx) => (
									<li key={idx}>
										<label className="flex items-center gap-2">
											<input
												type="radio"
												name={`q-${q.id}`}
												value={opt}
											/>
											{opt}
										</label>
									</li>
								))}
							</ul>
						) : (
							<input
								type="text"
								placeholder="Type your answer"
								className="w-full border p-2 rounded"
							/>
						)}
					</div>
				))}
			</section>
		</div>
	);
};

export default ListeningTestPage;

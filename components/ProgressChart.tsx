"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getDailySpeakingBands } from "@/lib/actions/test.action";

const chartConfig = {
	band: {
		label: "Actual Band",
		color: "#ef4444", // Tailwind red-500
	},
	target: {
		label: "Target Band",
		color: "#9ca3af", // Tailwind gray-400
	},
} satisfies ChartConfig;

const ProgressChart = () => {
	const { user } = useUser();
	const [chartData, setChartData] = useState<
		{ day: string; band: number; target: number }[]
	>([]);

	useEffect(() => {
		const fetchData = async () => {
			if (!user?.id) return;

			const data = await getDailySpeakingBands(user.id);
			setChartData(data);
		};

		fetchData();
	}, [user]);

	return (
		<div className="w-full lg:h-64 md:h-64 text-sm">
			<ChartContainer config={chartConfig} className="h-full w-full">
				<LineChart
					data={chartData}
					margin={{ top: 20, right: 40, left: 0, bottom: 5 }}
				>
					<CartesianGrid
						vertical={false}
						strokeDasharray="3 3"
						stroke="#374151" // Tailwind gray-700
					/>
					<XAxis
						dataKey="day"
						tickLine={false}
						axisLine={false}
						tick={{ fill: "#9ca3af" }} // gray-400
						tickMargin={8}
					/>
					<YAxis
						domain={[4, 9]} // Adjusted to fit band scores
						tickCount={6}
						tickLine={false}
						axisLine={false}
						tick={{ fill: "#9ca3af" }}
						tickMargin={8}
					/>
					<Legend verticalAlign="top" height={36} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line
						type="linear"
						dataKey="band"
						stroke="#ef4444"
						strokeWidth={2}
						dot
					/>
					<Line
						type="monotone"
						dataKey="target"
						stroke="#9ca3af"
						strokeWidth={2}
						strokeDasharray="5 5"
						dot={false}
					/>
				</LineChart>
			</ChartContainer>
		</div>
	);
};

export default ProgressChart;
